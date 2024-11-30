import { readFileSync } from "fs";

export const readResults = (args: { path: string }) => {
  return JSON.parse(readFileSync(args.path, "utf8"));
};
