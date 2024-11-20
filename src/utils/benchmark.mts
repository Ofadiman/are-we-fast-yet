import json2md from "json2md";
import fs from "node:fs";
import { Bench } from "tinybench";
import { getSystemPaths } from "./getSystemPaths.mjs";
import * as changeCase from "change-case";
import { getHardware } from "./getHardware.mjs";
import { sortResults } from "./sortResults.mjs";
import { getMarkdownTable } from "./getMarkdownTable.mjs";
import prettier from "prettier";

export const benchmark = async (args: {
  setup: (bench: Bench) => void;
  options?: ConstructorParameters<typeof Bench>[0];
  description: string;
  conclusion: string[];
  importMetaUrl: string;
}) => {
  const bench = new Bench(args.options ?? {});

  args.setup(bench);

  await bench.run();

  const table = bench.table();

  sortResults(table);

  const paths = await getSystemPaths({ importMetaUrl: args.importMetaUrl });

  const hardware = await getHardware();

  const markdown = json2md([
    { h1: changeCase.capitalCase(paths.fileName) },
    {
      p: args.description,
    },
    {
      h2: "Hardware",
    },
    {
      ul: [
        `[CPU] \`${hardware.cpu}\``,
        `[GPU] \`${hardware.gpu}\``,
        `[Motherboard] \`${hardware.motherboard}\``,
        `[RAM] \`${hardware.ram}\``,
        `[Disk] \`${hardware.disk}\``,
      ],
    },
    {
      h2: "Results",
    },
    {
      table: getMarkdownTable(table),
    },
    {
      h2: "Conclusion",
    },
    {
      ul: args.conclusion,
    },
  ]);

  const formatted = await prettier.format(markdown, { parser: "markdown" });
  fs.writeFileSync(`./${paths.fileName}.md`, formatted, "utf8");
};
