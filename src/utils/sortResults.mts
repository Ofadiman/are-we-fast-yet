export const sortResults = (args: {
  results: (Record<string, string | number | undefined> | null)[];
}) => {
  const clone = structuredClone(args.results);

  clone.sort((firstResult, secondResult) => {
    if (!firstResult || !secondResult) {
      throw new Error("left and right must be defined");
    }

    const firstThroughput = parseInt(
      (firstResult["Throughput avg (ops/s)"] as string).split(
        " ± ",
      )[0] as string,
    );
    const secondThroughput = parseInt(
      (secondResult["Throughput avg (ops/s)"] as string).split(
        " ± ",
      )[0] as string,
    );

    return secondThroughput - firstThroughput;
  });

  return clone;
};
