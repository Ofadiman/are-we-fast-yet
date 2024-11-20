export const sortResults = (
  table: (Record<string, string | number> | null | undefined)[],
) => {
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
};
