import { Bench } from "tinybench";
import { runBenchmark } from "../../runBenchmark.mjs";

const bench = new Bench({ name: "string-types" });

bench
  .add("single quote", () => {
    // prettier-ignore
    const string = 'f7991b09-ac45-486e-8bad-9ce525e92ed0'.concat('dab06944-9e87-4013-bce4-9db56a21673e');
  })
  .add("double quote", () => {
    // prettier-ignore
    const string = "f7991b09-ac45-486e-8bad-9ce525e92ed0".concat("dab06944-9e87-4013-bce4-9db56a21673e");
  })
  .add("backticks", () => {
    // prettier-ignore
    const string = `f7991b09-ac45-486e-8bad-9ce525e92ed0`.concat(`dab06944-9e87-4013-bce4-9db56a21673e`);
  });

await runBenchmark(bench);
