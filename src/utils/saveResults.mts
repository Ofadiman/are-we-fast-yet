import { writeFileSync } from "fs";

export const saveResults = (args: {
  path: string;
  results: (Record<string, string | number | undefined> | null)[];
}) => {
  writeFileSync(args.path, JSON.stringify(args.results), "utf8");
};
