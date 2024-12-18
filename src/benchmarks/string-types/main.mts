import { benchmark } from "../../utils/benchmark.mjs";

benchmark({
  options: {
    // This benchmark must be run for less than the default 10 seconds. This is because V8 throws weird memory allocation errors (e.g. FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory).
    time: 1_000,
  },
  setup: (bench) => {
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
  },
  description:
    "The purpose of this benchmark is to investigate which method of string declaration is the fastest while performing operations on strings.",
  conclusion: [
    "It seems that there are no significant differences between different string types in terms of performance.",
  ],
  filename: import.meta.filename,
});
