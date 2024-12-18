import json2md from "json2md";
import parse from "remark-parse";
import { format } from "prettier";
import { glob } from "glob";
import { readFileSync, writeFileSync } from "node:fs";
import { unified } from "unified";

export const createRootReadme = async () => {
  const listItems = (await glob("src/**/*.md"))
    .toSorted((left, right) => left.localeCompare(right))
    .map((file) => {
      const content = readFileSync(file);

      const root = unified().use(parse).parse(content);

      const h1 = root.children[0];
      if (!h1 || h1.type !== "heading") {
        throw new Error(
          `h1 must be the first element of the benchmark documentation`,
          {
            cause: h1,
          },
        );
      }

      const paragraph = root.children[1];
      if (!paragraph || paragraph.type !== "paragraph") {
        throw new Error(
          `paragraph must be the second element of the benchmark documentation`,
          {
            cause: paragraph,
          },
        );
      }

      return {
        file,
        h1: h1.children.map((child) => {
          if (!("value" in child)) {
            throw new Error(`unexpected h1 format`, { cause: h1 });
          }

          return child.value;
        }),
        description: paragraph.children
          .map((child) => {
            if (!("value" in child)) {
              throw new Error(`unexpected paragraph format`, {
                cause: paragraph,
              });
            }

            return child.value;
          })
          .join(""),
      };
    });

  const markdown = json2md([
    {
      h1: "Are We Fast Yet?",
    },
    {
      p: "No, we are not. A collection of experiments on slow code.",
    },
    {
      p: "Are you curious if your code is fast enough? Do you wonder if one library is faster than another? Is native code better than a library implemented on top of the language? Now you can check for yourself.",
    },
    {
      h2: "Available benchmarks",
    },
    {
      ul: listItems.map((item) => {
        return `[${item.h1}](${item.file}) - ${item.description}`;
      }),
    },
  ]);

  const formatted = await format(markdown, { parser: "markdown" });

  writeFileSync("readme.md", formatted);
};
