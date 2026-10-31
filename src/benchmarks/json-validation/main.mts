import "reflect-metadata";

import * as s from "superstruct";
import os from "node:os";
import { Bench } from "tinybench";
import { plainToInstance } from "class-transformer";
import { superstructSchema } from "./superstruct.mjs";
import { compiledTypeboxSchema, typeboxSchema } from "./typebox.mjs";
import { userFactory } from "../../fixtures/userFactory.mjs";
import { validateSync } from "class-validator";
import { yupSchema } from "./yup.mjs";
import { zodSchema } from "./zod.mjs";
import { User } from "./class-validator.mjs";
import { Value } from "@sinclair/typebox/value";

const user: any = userFactory();

const bench = new Bench({ name: "json-validation" });

console.table({
  cpu: os.cpus()[0]?.model,
  cores: os.availableParallelism(),
  memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GiB`,
  os: `${os.type()} ${os.release()} (${os.machine()})`,
  runtime: `${bench.runtime}@${bench.runtimeVersion}`,
});

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

await bench.run();

const rows = bench.table();

console.table(
  bench.tasks
    .map((task, index) => ({
      row: rows[index],
      throughput: "throughput" in task.result ? task.result.throughput.mean : 0,
    }))
    .toSorted((left, right) => right.throughput - left.throughput)
    .map(({ row }) => row),
);
