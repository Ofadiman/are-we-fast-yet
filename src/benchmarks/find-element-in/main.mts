import { User, userFactory } from "../../fixtures/userFactory.mjs";
import immutable from "immutable";
import { Bench } from "tinybench";
import { runBenchmark } from "../../runBenchmark.mjs";

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

await runBenchmark(bench);
