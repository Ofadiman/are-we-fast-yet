import { randomUUID } from "node:crypto";
import { v4, v7 } from "uuid";
import { Bench } from "tinybench";

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

const bench = new Bench();

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

await bench.run();

const table = bench.table();
table.sort((firstResult, secondResult) => {
  if (!firstResult || !secondResult) {
    throw new Error("left and right must be defined");
  }

  const firstThroughput = parseInt(
    (firstResult["Throughput average (ops/s)"] as string).split(
      " ± ",
    )[0] as string,
  );
  const secondThroughput = parseInt(
    (secondResult["Throughput average (ops/s)"] as string).split(
      " ± ",
    )[0] as string,
  );

  return secondThroughput - firstThroughput;
});

console.table(table);
