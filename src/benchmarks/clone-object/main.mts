import { copy } from "fast-copy";
import lodash from "lodash";
import * as ramda from "ramda";
import { Bench } from "tinybench";
import { user } from "../../fixtures/user.mjs";
import { run } from "../../run.mjs";

const original = user();
let clone: unknown;

const bench = new Bench({ name: "clone-object" });

bench
  .add(`JSON.stringify + JSON.parse (plain JSON values only)`, () => {
    clone = JSON.parse(JSON.stringify(original));
  })
  .add(`structuredClone (no functions, symbol keys, class instances)`, () => {
    clone = structuredClone(original);
  })
  .add(`lodash.cloneDeep`, () => {
    clone = lodash.cloneDeep(original);
  })
  .add(`ramda.clone (no Map, Set, symbol keys)`, () => {
    clone = ramda.clone(original);
  })
  .add(`fast-copy`, () => {
    clone = copy(original);
  });

await run(bench);
