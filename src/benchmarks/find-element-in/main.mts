import { User, userFactory } from "../../fixtures/userFactory.mjs";
import immutable from "immutable";
import os from "node:os";
import { Bench } from "tinybench";

const record = {} as Record<string, User>;
const map = new Map<string, User>();
let immutableMap = immutable.Map<string, User>();
let immutableRecord = immutable.Record({} as { [Key: string]: User })();

let firstElementId: string;
let middleElementId: string;
let lastElementId: string;

const COUNT = 100;
for (let i = 0; i < COUNT; i++) {
  const user = userFactory();

  if (i === 0) {
    firstElementId = user.id;
  }

  if (i === COUNT / 2 - 1) {
    middleElementId = user.id;
  }

  if (i === COUNT - 1) {
    lastElementId = user.id;
  }

  record[user.id] = user;
  map.set(user.id, user);
  immutableMap = immutableMap.set(user.id, user);
  immutableRecord = immutableRecord.set(user.id, user);
}

const bench = new Bench({ name: "find-element-in" });

console.table({
  cpu: os.cpus()[0]?.model,
  cores: os.availableParallelism(),
  memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GiB`,
  os: `${os.type()} ${os.release()} (${os.machine()})`,
  runtime: `${bench.runtime}@${bench.runtimeVersion}`,
});

bench
  .add(`record`, () => {
    record[firstElementId];
    record[middleElementId];
    record[lastElementId];
  })
  .add(`map`, () => {
    map.get(firstElementId);
    map.get(middleElementId);
    map.get(lastElementId);
  })
  .add(`immutable record`, () => {
    immutableRecord.get(firstElementId);
    immutableRecord.get(middleElementId);
    immutableRecord.get(lastElementId);
  })
  .add(`immutable map`, () => {
    immutableMap.get(firstElementId);
    immutableMap.get(middleElementId);
    immutableMap.get(lastElementId);
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
