import { User, userFactory } from "../../utils/userFactory.mjs";
import { benchmark } from "../../utils/benchmark.mjs";
import immutable from "immutable";

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

benchmark({
  options: {
    // This benchmark must be run for less than the default 10 seconds. This is because V8 throws weird memory allocation errors (e.g. FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory).
    time: 2_000,
  },
  setup: (bench) => {
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
  },
  filename: import.meta.filename,
  description: `The purpose of this benchmark is to investigate which "hash map" implementation is the fastest when it comes to accessing semi-random elements.`,
  conclusion: [
    "`Record` data structure from [immutable.js]() library is the fastest in accessing semi-random elements.",
    "Native `Map` is about 10% faster than `record (object literal)` in accessing a semi-random elements.",
  ],
});
