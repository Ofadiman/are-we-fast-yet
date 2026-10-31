import os from "node:os";
import { Bench } from "tinybench";

const bench = new Bench({ name: "string-types" });

console.table({
  cpu: os.cpus()[0]?.model,
  cores: os.availableParallelism(),
  memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GiB`,
  os: `${os.type()} ${os.release()} (${os.machine()})`,
  runtime: `${bench.runtime}@${bench.runtimeVersion}`,
});

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

await bench.run();

const rows = bench.table();

console.table(
  bench.tasks
    .map((task, index) => ({
      row: rows[index],
      throughput: "throughput" in task.result ? task.result.throughput.mean : 0,
    }))
    .toSorted((left, right) => right.throughput - left.throughput)
    .map(({ row }) => row),
);
