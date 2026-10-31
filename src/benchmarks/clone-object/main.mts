import lodash from "lodash";
import os from "node:os";
import * as ramda from "ramda";
import { Bench } from "tinybench";
import { userFactory } from "../../fixtures/userFactory.mjs";
import { chatgpt as chatgptCloneDeep } from "./chatgptCloneDeep.mjs";
import { claude as claudeCloneDeep } from "./claudeCloneDeep.mjs";
import { fastJsonCloneDeep } from "./fastJsonCloneDeep.mjs";

const user = userFactory();

const bench = new Bench({ name: "clone-object" });

console.table({
  cpu: os.cpus()[0]?.model,
  cores: os.availableParallelism(),
  memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GiB`,
  os: `${os.type()} ${os.release()} (${os.machine()})`,
  runtime: `${bench.runtime}@${bench.runtimeVersion}`,
});

bench
  .add(`JSON.stringify + JSON.parse`, () => {
    const clone = JSON.parse(JSON.stringify(user));
  })
  .add(`structuredClone`, () => {
    const clone = structuredClone(user);
  })
  .add(`fast-json-stringify + secure-json-parse (from fastify)`, () => {
    const clone = fastJsonCloneDeep(user);
  })
  .add(`lodash.cloneDeep`, () => {
    const clone = lodash.cloneDeep(user);
  })
  .add(`ramda.clone`, () => {
    const clone = ramda.clone(user);
  })
  .add(`chatgpt`, () => {
    const clone = chatgptCloneDeep(user);
  })
  .add(`claude`, () => {
    const clone = claudeCloneDeep(user);
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
