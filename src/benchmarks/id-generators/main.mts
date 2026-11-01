import { randomUUID } from "node:crypto";
import { nanoid } from "nanoid";
import { Bench } from "tinybench";
import { v7 } from "uuid";
import { run } from "../../run.mjs";

function* createIdGenerator() {
  let current = 0;
  while (true) {
    current += 1;
    yield current;
  }
}

const idGenerator = createIdGenerator();

class IdFactory {
  current = 0;

  next() {
    this.current += 1;
    return this.current;
  }
}

const idFactory = new IdFactory();

const IDS_PER_SAMPLE = 1_000;

let stringId: unknown;
let integerId: unknown;

const bench = new Bench({ name: "id-generators" });

// By default tinybench times each call of a task function and records it as one sample. Generating one
// id can take less than the smallest step the clock can measure (about 42 ns on Apple silicon), so
// timing a single id per call would record mostly 0 ns or 42 ns. Instead, every task generates
// IDS_PER_SAMPLE ids in a loop, times the whole loop itself, and returns the object built here:
// - overriddenDuration replaces tinybench's own measurement with the average time of one id.
// - overriddenIterationCost reports how long the whole call really took. tinybench keeps sampling until
//   the recorded times add up to its time budget (one second by default), so without this field it would
//   add only the per-id average and keep running IDS_PER_SAMPLE times longer than intended.
const perId = (start: number) => {
  const elapsed = bench.now() - start;
  return {
    overriddenDuration: elapsed / IDS_PER_SAMPLE,
    overriddenIterationCost: elapsed,
  };
};

bench
  .add(`randomUUID (random)`, () => {
    const start = bench.now();
    for (let i = 0; i < IDS_PER_SAMPLE; i++) {
      stringId = randomUUID();
    }
    return perId(start);
  })
  .add(`uuid v7 (sortable by time)`, () => {
    const start = bench.now();
    for (let i = 0; i < IDS_PER_SAMPLE; i++) {
      stringId = v7();
    }
    return perId(start);
  })
  .add(`nanoid (random)`, () => {
    const start = bench.now();
    for (let i = 0; i < IDS_PER_SAMPLE; i++) {
      stringId = nanoid();
    }
    return perId(start);
  })
  .add(
    `integer-based generator function (unique within one process only)`,
    () => {
      const start = bench.now();
      for (let i = 0; i < IDS_PER_SAMPLE; i++) {
        integerId = idGenerator.next().value;
      }
      return perId(start);
    },
  )
  .add(`integer-based class (unique within one process only)`, () => {
    const start = bench.now();
    for (let i = 0; i < IDS_PER_SAMPLE; i++) {
      integerId = idFactory.next();
    }
    return perId(start);
  });

await run(bench);
