import { randomUUID } from "node:crypto";
import os from "node:os";
import { Bench } from "tinybench";
import { v4, v7 } from "uuid";
import { idFactory } from "./idFactory.mjs";
import { idGenerator } from "./idGenerator.mjs";

const bench = new Bench({ name: "id-generators" });

console.table({
  cpu: os.cpus()[0]?.model,
  cores: os.availableParallelism(),
  memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GiB`,
  os: `${os.type()} ${os.release()} (${os.machine()})`,
  runtime: `${bench.runtime}@${bench.runtimeVersion}`,
});

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
