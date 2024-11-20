export const getMarkdownTable = (
  data: (Record<string, string | number> | null | undefined)[],
): {
  headers: string[];
  rows: { [key: string]: string | number }[];
} => {
  if (data.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = Object.keys(data[0]!);

  const rows = data.map((row) => {
    return headers.reduce(
      (acc, key) => {
        acc[key] = row![key]!;
        return acc;
      },
      {} as Record<string, string | number>,
    );
  });

  return {
    headers,
    rows,
  };
};
