import os from "node:os";
import type { Bench } from "tinybench";

export const run = async (bench: Bench) => {
  console.table({
    cpu: os.cpus()[0]?.model,
    cores: os.availableParallelism(),
    memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GiB`,
    os: `${os.type()} ${os.release()} (${os.machine()})`,
    runtime: `${bench.runtime}@${bench.runtimeVersion}`,
  });

  await bench.run();

  const rows = bench.table();

  console.table(
    bench.tasks
      .map((task, index) => ({
        row: rows[index],
        throughput:
          "throughput" in task.result ? task.result.throughput.mean : 0,
      }))
      .toSorted((left, right) => right.throughput - left.throughput)
      .map(({ row }) => row),
  );
};
