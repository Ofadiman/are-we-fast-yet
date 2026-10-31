import lodash from "lodash";
import * as ramda from "ramda";
import { Bench } from "tinybench";
import { userFactory } from "../../fixtures/userFactory.mjs";
import { runBenchmark } from "../../runBenchmark.mjs";
import { chatgpt as chatgptCloneDeep } from "./chatgptCloneDeep.mjs";
import { claude as claudeCloneDeep } from "./claudeCloneDeep.mjs";
import { fastJsonCloneDeep } from "./fastJsonCloneDeep.mjs";

const user = userFactory();

const bench = new Bench({ name: "clone-object" });

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

await runBenchmark(bench);
