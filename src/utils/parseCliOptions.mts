import yargs from "yargs";

export const parseCliOptions = () => {
  return yargs(process.argv.slice(2))
    .options({
      docs: { type: "boolean", default: false },
    })
    .parseSync();
};
