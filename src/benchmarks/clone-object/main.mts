import { copy } from "fast-copy";
import lodash from "lodash";
import * as ramda from "ramda";
import { Bench } from "tinybench";
import { userFactory } from "../../fixtures/userFactory.mjs";
import { runBenchmark } from "../../runBenchmark.mjs";

const user = userFactory();
let clone: unknown;

const bench = new Bench({ name: "clone-object" });

bench
  .add(`JSON.stringify + JSON.parse (plain JSON values only)`, () => {
    clone = JSON.parse(JSON.stringify(user));
  })
  .add(`structuredClone (no functions, symbol keys, class instances)`, () => {
    clone = structuredClone(user);
  })
  .add(`lodash.cloneDeep`, () => {
    clone = lodash.cloneDeep(user);
  })
  .add(`ramda.clone (no Map, Set, symbol keys)`, () => {
    clone = ramda.clone(user);
  })
  .add(`fast-copy`, () => {
    clone = copy(user);
  });

await runBenchmark(bench);
