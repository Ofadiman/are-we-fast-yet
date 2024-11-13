import { Bench } from "tinybench";
import { User, userFactory } from "../../utils/userFactory.mjs";

const array: User[] = [];
const record: Record<string, User> = {};
const map: Map<string, User> = new Map();

const COUNT = 100;

for (let i = 0; i < COUNT; i++) {
  const user = userFactory();
  record[user.id] = user;
  array.push(user);
  map.set(user.id, user);
}

const firstElementId = array[0]!.id;
const lastElementId = array[COUNT - 1]!.id;

const bench = new Bench();

bench
  .add(`find first element using array.find()`, () => {
    const element = array.find((element) => element.id === firstElementId);
  })
  .add(`find last element using array.find()`, () => {
    const element = array.find((element) => element.id === lastElementId);
  })
  .add(`find first element using for loop`, () => {
    let element;
    for (let i = 0; i < COUNT; i++) {
      if (firstElementId === array[i]!.id) {
        if (element) {
          break;
        }
        element = array[i];
      }
    }
  })
  .add(`find last element using for loop`, () => {
    let element;
    for (let i = 0; i < COUNT; i++) {
      if (lastElementId === array[i]!.id) {
        if (element) {
          break;
        }
        element = array[i];
      }
    }
  })
  .add(`find first element using record`, () => {
    const element = record[firstElementId];
  })
  .add(`find last element using record`, () => {
    const element = record[lastElementId];
  })
  .add(`find first element using Map`, () => {
    const element = map.get(firstElementId);
  })
  .add(`find last element using Map`, () => {
    const element = map.get(lastElementId);
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
