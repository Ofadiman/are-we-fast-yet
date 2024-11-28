import json2md from "json2md";
import parse from "remark-parse";
import { format } from "prettier";
import { glob } from "glob";
import { readFileSync, writeFileSync } from "node:fs";
import { unified } from "unified";

const listItems = (await glob("src/**/*.md")).map((file) => {
  const content = readFileSync(file);

  const root = unified().use(parse).parse(content);

  const element = root.children[1];
  if (!element || element.type !== "paragraph") {
    throw new Error(
      `paragraph must be the second element of the benchmark documentation`,
      {
        cause: element,
      },
    );
  }

  return {
    file,
    description: element.children
      .map((child) => {
        if (!("value" in child)) {
          throw new Error(`unexpected paragraph format`, { cause: element });
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
    ul: listItems.map((item) => {
      return `[${item.description}](${item.file})`;
    }),
  },
]);

const formatted = await format(markdown, { parser: "markdown" });

writeFileSync("readme.md", formatted);
