import "reflect-metadata";

import * as s from "superstruct";
import { benchmark } from "../../utils/benchmark.mjs";
import { plainToInstance } from "class-transformer";
import { superstructSchema } from "./superstruct.mjs";
import { compiledTypeboxSchema, typeboxSchema } from "./typebox.mjs";
import { userFactory } from "../../utils/userFactory.mjs";
import { validateSync } from "class-validator";
import { yupSchema } from "./yup.mjs";
import { zodSchema } from "./zod.mjs";
import { User } from "./class-validator.mjs";
import { Value } from "@sinclair/typebox/value";

const user: any = userFactory();

benchmark({
  options: {
    time: 5_000,
  },
  setup: (bench) => {
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
  },
  description:
    "The purpose of this benchmark is to investigate the performance of different data validation libraries.",
  conclusion: [
    "Compiled `typebox` schema is ~80 times faster than `zod`.",
    "Raw `typebox` schema is ~340 times slower than compiled `typebox` schema.",
  ],
  filename: import.meta.filename,
});
