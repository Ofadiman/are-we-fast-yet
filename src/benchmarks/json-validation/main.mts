import "reflect-metadata";

import * as s from "superstruct";
import { Bench } from "tinybench";
import { plainToInstance } from "class-transformer";
import { superstructSchema } from "./superstruct.mjs";
import { compiledTypeboxSchema, typeboxSchema } from "./typebox.mjs";
import { userFactory } from "../../fixtures/userFactory.mjs";
import { runBenchmark } from "../../runBenchmark.mjs";
import { validateSync } from "class-validator";
import { yupSchema } from "./yup.mjs";
import { zodSchema } from "./zod.mjs";
import { User } from "./class-validator.mjs";
import { Value } from "@sinclair/typebox/value";

const user: any = userFactory();

const bench = new Bench({ name: "json-validation" });

bench
  .add("typebox (parse)", () => {
    Value.Parse(typeboxSchema, user);
  })
  .add("typebox (compiled)", () => {
    compiledTypeboxSchema.Check(user);
  })
  .add("zod", () => {
    zodSchema.parse(user);
  })
  .add("superstruct", () => {
    s.assert(user, superstructSchema);
  })
  .add("yup", () => {
    yupSchema.validateSync(user);
  })
  .add("class-validator", () => {
    validateSync(plainToInstance(User, user));
  });

await runBenchmark(bench);
