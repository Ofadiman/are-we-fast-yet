import prettier from "prettier";

export const formatDocs = async (args: { docs: string }) => {
  return prettier.format(args.docs, { parser: "markdown" });
};
