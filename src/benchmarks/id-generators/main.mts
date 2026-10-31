import { randomUUID } from "node:crypto";
import { Bench } from "tinybench";
import { v4, v7 } from "uuid";
import { runBenchmark } from "../../runBenchmark.mjs";
import { idFactory } from "./idFactory.mjs";
import { idGenerator } from "./idGenerator.mjs";

const bench = new Bench({ name: "id-generators" });

bench
  .add(`randomUUID`, () => {
    randomUUID();
  })
  .add(`uuid v4`, () => {
    v4();
  })
  .add(`uuid v7`, () => {
    v7();
  })
  .add(`integer-based generator function`, () => {
    idGenerator.next();
  })
  .add(`integer-based class`, () => {
    idFactory.next();
  });

await runBenchmark(bench);
