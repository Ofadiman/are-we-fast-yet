import { User, userFactory } from "../utils/userFactory.mjs";
import { benchmark } from "../utils/benchmark.mjs";

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

benchmark({
  setup: (bench) => {
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
  },
  importMetaUrl: import.meta.url,
  description:
    "The purpose of the benchmark is to test how data access speed changes based on data structure used to store the data. I used `array`, `record (object literal)` and `Map` data structures in the benchmark.",
  conclusion: [
    "`Map` is about 10% faster than `record (object literal)` in accessing a semi-random element.",
    "The `array.find()` method is as fast as `map.get()` at best-case scenario.",
    "The `for loop` is about 9-10 times slower than `array.find()`.",
  ],
});
