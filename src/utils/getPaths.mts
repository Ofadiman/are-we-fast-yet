import path from "path";

export const getPaths = (args: { filename: string }) => {
  const filename = path.basename(args.filename, ".mts");

  const json = path.join(
    path.dirname(args.filename),
    `${filename}.results.json`,
  );

  const docs = path.join(path.dirname(args.filename), `${filename}.md`);

  return {
    filename,
    json,
    docs,
  };
};
