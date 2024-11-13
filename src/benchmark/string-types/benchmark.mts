import { Bench } from "tinybench";

const bench = new Bench();

bench
  .add("single quote", () => {
    // prettier-ignore
    const string = 'f7991b09-ac45-486e-8bad-9ce525e92ed0';
  })
  .add("double quote", () => {
    // prettier-ignore
    const string = "f7991b09-ac45-486e-8bad-9ce525e92ed0";
  })
  .add("backticks", () => {
    // prettier-ignore
    const string = `f7991b09-ac45-486e-8bad-9ce525e92ed0`;
  });

await bench.run();

const table = bench.table();
table.sort((firstResult, secondResult) => {
  if (!firstResult || !secondResult) {
    throw new Error("left and right must be defined");
  }

  const firstThroughput = parseInt(
    (firstResult["Throughput average (ops/s)"] as string).split(
      " ± ",
    )[0] as string,
  );
  const secondThroughput = parseInt(
    (secondResult["Throughput average (ops/s)"] as string).split(
      " ± ",
    )[0] as string,
  );

  return secondThroughput - firstThroughput;
});

console.table(table);
