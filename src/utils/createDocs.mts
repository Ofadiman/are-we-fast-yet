import json2md from "json2md";
import { capitalCase } from "change-case";
import { getHardware } from "./getHardware.mjs";
import { getEnvironment } from "./getEnvironment.mjs";
import { getMarkdownTable } from "./getMarkdownTable.mjs";
import { readResults } from "./readResults.mjs";

export const createDocs = (args: {
  filename: string;
  description: string;
  hardware: Awaited<ReturnType<typeof getHardware>>;
  environment: ReturnType<typeof getEnvironment>;
  results: ReturnType<typeof readResults>;
  conclusion: string[];
}) => {
  return json2md([
    { h1: capitalCase(args.filename) },
    {
      p: args.description,
    },
    {
      h2: "Hardware",
    },
    {
      ul: [
        `[CPU] \`${args.hardware.cpu}\``,
        `[GPU] \`${args.hardware.gpu}\``,
        `[Motherboard] \`${args.hardware.motherboard}\``,
        `[RAM] \`${args.hardware.ram}\``,
        `[Disk] \`${args.hardware.disk}\``,
      ],
    },
    { h2: "Environment" },
    {
      ul: [
        `[Node] \`${args.environment.node}\``,
        `[NPM] \`${args.environment.npm}\``,
        `[tsx] \`${args.environment.tsx}\``,
        `[OS] \`${args.environment.os}\``,
      ],
    },
    {
      h2: "Results",
    },
    {
      table: getMarkdownTable(args.results),
    },
    {
      h2: "Conclusion",
    },
    {
      ul: args.conclusion,
    },
  ]);
};
