import { writeFileSync } from "fs";

export const saveResults = (args: {
  path: string;
  results: (Record<string, string | number> | null | undefined)[];
}) => {
  writeFileSync(args.path, JSON.stringify(args.results), "utf8");
};
