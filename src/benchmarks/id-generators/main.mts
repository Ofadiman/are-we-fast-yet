import { randomUUID } from "node:crypto";
import { v4, v7 } from "uuid";
import { benchmark } from "../../utils/benchmark.mjs";
import { idFactory } from "./idFactory.mjs";
import { idGenerator } from "./idGenerator.mjs";

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
        idGenerator.next();
      })
      .add(`integer-based class`, () => {
        idFactory.next();
      });
  },
  filename: import.meta.filename,
  description:
    "The purpose of this benchmark is to investigate the performance of different methods for generating IDs.",
  conclusion: [
    "Generating integer-based ids is ~60% faster than generating of uuids.",
    "Generating integer-based ids using a class-based factory is ~20% faster than a generator function.",
    "The `randomUUID` function available in Node.js is ~100% faster than the `v4` function available in the `uuid` package.",
    "Generating uuid v4 is ~20% faster than generating uuid v7.",
  ],
});
