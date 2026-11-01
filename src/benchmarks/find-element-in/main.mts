import { Faker, en } from "@faker-js/faker";
import { User, userFactory } from "../../fixtures/userFactory.mjs";
import immutable from "immutable";
import { Bench } from "tinybench";
import { runBenchmark } from "../../runBenchmark.mjs";

const USERS = 100;
const LOOKUPS = 1_000;

const users = Array.from({ length: USERS }, userFactory);

const faker = new Faker({ locale: [en] });
faker.seed(1);
const lookupIds = Array.from(
  { length: LOOKUPS },
  () => faker.helpers.arrayElement(users).id,
);

const record: Record<string, User> = {};
const map = new Map<string, User>();
for (const user of users) {
  record[user.id] = user;
  map.set(user.id, user);
}
const immutableMap = immutable.Map(map);

let found: User | undefined;

const bench = new Bench({ name: "find-element-in" });

// By default tinybench times each call of a task function and records it as one sample. One lookup
// takes a few nanoseconds, less than the smallest step the clock can measure (about 42 ns on Apple
// silicon), so timing a single lookup per call would record mostly 0 ns or 42 ns. Instead, every task
// runs LOOKUPS lookups in a loop, times the whole loop itself, and returns the object built here:
// - overriddenDuration replaces tinybench's own measurement with the average time of one lookup.
// - overriddenIterationCost reports how long the whole call really took. tinybench keeps sampling until
//   the recorded times add up to its time budget (one second by default), so without this field it would
//   add only the per-lookup average and keep running LOOKUPS times longer than intended.
const perLookup = (start: number) => {
  const elapsed = bench.now() - start;
  return {
    overriddenDuration: elapsed / LOOKUPS,
    overriddenIterationCost: elapsed,
  };
};

bench
  .add(`record`, () => {
    const start = bench.now();
    for (const id of lookupIds) {
      found = record[id];
    }
    return perLookup(start);
  })
  .add(`map`, () => {
    const start = bench.now();
    for (const id of lookupIds) {
      found = map.get(id);
    }
    return perLookup(start);
  })
  .add(`immutable map`, () => {
    const start = bench.now();
    for (const id of lookupIds) {
      found = immutableMap.get(id);
    }
    return perLookup(start);
  })
  .add(`array.find`, () => {
    const start = bench.now();
    for (const id of lookupIds) {
      found = users.find((user) => user.id === id);
    }
    return perLookup(start);
  });

await runBenchmark(bench);
