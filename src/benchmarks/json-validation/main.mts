import "reflect-metadata";

import * as s from "superstruct";
import { Bench } from "tinybench";
import { plainToInstance } from "class-transformer";
import * as v from "valibot";
import { superstructSchema } from "./superstruct.mjs";
import { compiledTypeboxSchema, typeboxSchema } from "./typebox.mjs";
import { user } from "../../fixtures/user.mjs";
import { run } from "../../run.mjs";
import { validateSync } from "class-validator";
import { arktypeSchema } from "./arktype.mjs";
import { valibotSchema } from "./valibot.mjs";
import { yupSchema } from "./yup.mjs";
import { zodSchema } from "./zod.mjs";
import { User } from "./class-validator.mjs";
import Value from "typebox/value";

const USERS = 100;

const users = Array.from({ length: USERS }, user);

let result: unknown;

const bench = new Bench({ name: "json-validation" });

// By default tinybench times each call of a task function and records it as one sample. The fastest
// validators check one user in about 50 ns, close to the smallest step the clock can measure (about
// 42 ns on Apple silicon), so timing a single validation per call would record mostly whole clock steps.
// Instead, every task validates all USERS users in a loop, times the whole loop itself, and returns the
// object built here:
// - overriddenDuration replaces tinybench's own measurement with the average time of one validation.
// - overriddenIterationCost reports how long the whole call really took. tinybench keeps sampling until
//   the recorded times add up to its time budget (one second by default), so without this field it would
//   add only the per-validation average and keep running USERS times longer than intended.
const perValidation = (start: number) => {
  const elapsed = bench.now() - start;
  return {
    overriddenDuration: elapsed / USERS,
    overriddenIterationCost: elapsed,
  };
};

bench
  .add("typebox Value.Parse (check only)", () => {
    const start = bench.now();
    for (const user of users) {
      result = Value.Parse(typeboxSchema, user);
    }
    return perValidation(start);
  })
  .add("typebox compiled (check only)", () => {
    const start = bench.now();
    for (const user of users) {
      result = compiledTypeboxSchema.Check(user);
    }
    return perValidation(start);
  })
  .add("arktype (check only)", () => {
    const start = bench.now();
    for (const user of users) {
      result = arktypeSchema(user);
    }
    return perValidation(start);
  })
  .add("valibot (returns copy without unknown keys)", () => {
    const start = bench.now();
    for (const user of users) {
      result = v.parse(valibotSchema, user);
    }
    return perValidation(start);
  })
  .add("zod (returns copy without unknown keys)", () => {
    const start = bench.now();
    for (const user of users) {
      result = zodSchema.parse(user);
    }
    return perValidation(start);
  })
  .add("superstruct (rejects unknown keys)", () => {
    const start = bench.now();
    for (const user of users) {
      s.assert(user, superstructSchema);
    }
    return perValidation(start);
  })
  .add("yup (converts types)", () => {
    const start = bench.now();
    for (const user of users) {
      result = yupSchema.validateSync(user);
    }
    return perValidation(start);
  })
  .add(
    "class-validator (builds class instances, types not checked against rules)",
    () => {
      const start = bench.now();
      for (const user of users) {
        result = validateSync(plainToInstance(User, user));
      }
      return perValidation(start);
    },
  );

await run(bench);
