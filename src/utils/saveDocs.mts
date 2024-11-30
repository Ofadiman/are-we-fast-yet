import { writeFileSync } from "fs";

export const saveDocs = (args: { path: string; docs: string }) => {
  writeFileSync(args.path, args.docs, "utf8");
};
