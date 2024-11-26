import json2md from "json2md";
import fs from "node:fs";
import { Bench } from "tinybench";
import * as changeCase from "change-case";
import { getHardware } from "./getHardware.mjs";
import { sortResults } from "./sortResults.mjs";
import { getMarkdownTable } from "./getMarkdownTable.mjs";
import prettier from "prettier";
import { getEnvironment } from "./getEnvironment.mjs";
import yargs from "yargs";
import path from "node:path";

export const benchmark = async (args: {
  setup: (bench: Bench) => void;
  options?: ConstructorParameters<typeof Bench>[0];
  description: string;
  conclusion: string[];
  filename: string;
}) => {
  const argv = yargs(process.argv.slice(2))
    .options({
      docs: { type: "boolean", default: false },
    })
    .parseSync();

  const fileNameWithoutExtension = path.basename(args.filename, ".mts");
  const resultsJsonPath = path.join(
    path.dirname(args.filename),
    `${fileNameWithoutExtension}.results.json`,
  );
  const docsMarkdownPath = path.join(
    path.dirname(args.filename),
    `${fileNameWithoutExtension}.md`,
  );

  if (argv.docs) {
    const table = JSON.parse(fs.readFileSync(resultsJsonPath, "utf8"));

    const hardware = await getHardware();
    const environment = getEnvironment();

    const markdown = json2md([
      { h1: changeCase.capitalCase(fileNameWithoutExtension) },
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
      { h2: "Environment" },
      {
        ul: [
          `[Node] \`${environment.node}\``,
          `[NPM] \`${environment.npm}\``,
          `[tsx] \`${environment.tsx}\``,
          `[OS] \`${environment.os}\``,
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

    fs.writeFileSync(docsMarkdownPath, formatted, "utf8");
  } else {
    const bench = new Bench(args.options ?? {});

    args.setup(bench);

    await bench.run();

    const table = bench.table();
    sortResults(table);

    fs.writeFileSync(resultsJsonPath, JSON.stringify(table), "utf8");
  }
};
