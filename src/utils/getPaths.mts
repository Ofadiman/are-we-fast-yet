import path from "path";

export const getPaths = (args: { filename: string }) => {
  const json = path.join(path.dirname(args.filename), `results.json`);
  const docs = path.join(path.dirname(args.filename), `readme.md`);

  return {
    json,
    docs,
  };
};
