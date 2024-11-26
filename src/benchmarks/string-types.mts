import { benchmark } from "../utils/benchmark.mjs";

benchmark({
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
    "This benchmark was designed to test which type of string is the fastest in JavaScript.",
  conclusion: [
    "It seems that there are no significant differences between different string types in terms of performance.",
  ],
  filename: import.meta.filename,
});
