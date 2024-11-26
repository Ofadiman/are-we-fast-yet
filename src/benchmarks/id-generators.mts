import { randomUUID } from "node:crypto";
import { v4, v7 } from "uuid";
import { benchmark } from "../utils/benchmark.mjs";

function* CreateIdGenerator() {
  let current = 0;
  while (true) {
    current += 1;
    yield current;
  }
}

const createIdGenerator = CreateIdGenerator();

class CreateIdClass {
  current = 0;

  next() {
    this.current += 1;
    return this.current;
  }
}

const createIdClass = new CreateIdClass();

benchmark({
  setup: (bench) => {
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
        createIdGenerator.next();
      })
      .add(`integer-based class`, () => {
        createIdClass.next();
      });
  },
  filename: import.meta.filename,
  description:
    "The goal of this benchmark is to check the performance of different methods for generating IDs in JavaScript.",
  conclusion: [
    "Generation of integer-based ids is ~70% faster than the generation of uuids.",
    "Generator functions are ~20% slower than simpler solutions using classes.",
    "The `randomUUID` function available in Node.js is ~120% faster than the `v4` function available in the `uuid` package.",
    "Generating uuid v4 is ~20% faster than generating uuid v7.",
  ],
});
