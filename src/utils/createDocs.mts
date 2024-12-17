import json2md from "json2md";
import { capitalCase } from "change-case";
import { getHardware } from "./getHardware.mjs";
import { getEnvironment } from "./getEnvironment.mjs";
import { getMarkdownTable } from "./getMarkdownTable.mjs";
import { readResults } from "./readResults.mjs";

export const createDocs = (args: {
  dirname: string;
  description: string;
  hardware: Awaited<ReturnType<typeof getHardware>>;
  environment: ReturnType<typeof getEnvironment>;
  results: ReturnType<typeof readResults>;
  conclusion: string[];
}) => {
  return json2md([
    { h1: capitalCase(args.dirname) },
    {
      p: args.description,
    },
    {
      h2: "Hardware",
    },
    {
      ul: [
        `\`${args.hardware.cpu}\``,
        `\`${args.hardware.gpu}\``,
        `\`${args.hardware.motherboard}\``,
        `\`${args.hardware.disk}\``,
        `\`${args.hardware.ram}\``,
      ],
    },
    { h2: "Environment" },
    {
      ul: [
        `\`${args.environment.node}\``,
        `\`${args.environment.npm}\``,
        `\`${args.environment.tsx}\``,
        `\`${args.environment.os}\``,
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
