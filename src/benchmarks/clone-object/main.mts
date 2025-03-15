import lodash from "lodash";
import * as ramda from "ramda";
import { benchmark } from "../../utils/benchmark.mjs";
import { userFactory } from "../../utils/userFactory.mjs";
import { chatgpt as chatgptCloneDeep } from "./chatgptCloneDeep.mjs";
import { claude as claudeCloneDeep } from "./claudeCloneDeep.mjs";
import { fastJsonCloneDeep } from "./fastJsonCloneDeep.mjs";

const user = userFactory();

benchmark({
  setup: (bench) => {
    bench
      .add(`JSON.stringify + JSON.parse`, () => {
        const clone = JSON.parse(JSON.stringify(user));
      })
      .add(`structuredClone`, () => {
        const clone = structuredClone(user);
      })
      .add(`fast-json-stringify + secure-json-parse (from fastify)`, () => {
        const clone = fastJsonCloneDeep(user);
      })
      .add(`lodash.cloneDeep`, () => {
        const clone = lodash.cloneDeep(user);
      })
      .add(`ramda.clone`, () => {
        const clone = ramda.clone(user);
      })
      .add(`chatgpt`, () => {
        const clone = chatgptCloneDeep(user);
      })
      .add(`claude`, () => {
        const clone = claudeCloneDeep(user);
      });
  },
  filename: import.meta.filename,
  description:
    "The purpose of this benchmark is to investigate which method of copying objects in Node.js is the fastest.",
  conclusion: [
    "ChatGPT has created the fastest deep clone function. It is over 40% faster than the version proposed by Claude.",
    "The fastest, widely-used method of cloning an object is `cloneDeep` function from `lodash` library. It is over 3.5 times slower than the version proposed by ChatGPT.",
  ],
});
