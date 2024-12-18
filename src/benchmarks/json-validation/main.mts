import "reflect-metadata";

import * as s from "superstruct";
import { benchmark } from "../../utils/benchmark.mjs";
import { plainToInstance } from "class-transformer";
import { superstructSchema } from "./superstruct.mjs";
import { typeboxSchema } from "./typebox.mjs";
import { userFactory } from "../../utils/userFactory.mjs";
import { validateSync } from "class-validator";
import { yupSchema } from "./yup.mjs";
import { zodSchema } from "./zod.mjs";
import { User } from "./class-validator.mjs";

const user: any = userFactory();

benchmark({
  options: {
    time: 5000,
  },
  setup: (bench) => {
    bench
      .add("typebox", () => {
        typeboxSchema.Check(user);
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
    "`zod` is the fastest library when it comes to validating JavaScript objects. It beats the second fastest library, `superstruct`, by ~3.5 times.",
  ],
  filename: import.meta.filename,
});
