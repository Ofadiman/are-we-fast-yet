import lodash from "lodash";
import path from "node:path";
import { Bench, Options } from "tinybench";
import { createBenchmarkReadme } from "./createBenchmarkReadme.mjs";
import { createRootReadme } from "./createRootReadme.mjs";
import { formatDocs } from "./formatDocs.mjs";
import { getEnvironment } from "./getEnvironment.mjs";
import { getHardware } from "./getHardware.mjs";
import { getPaths } from "./getPaths.mjs";
import { parseCliOptions } from "./parseCliOptions.mjs";
import { readResults } from "./readResults.mjs";
import { saveDocs } from "./saveDocs.mjs";
import { saveResults } from "./saveResults.mjs";
import { sortResults } from "./sortResults.mjs";

export const benchmark = async (args: {
  setup: (bench: Bench) => void;
  options?: Options;
  description: string;
  conclusion: string[];
  filename: string;
}) => {
  const options = parseCliOptions();
  const paths = getPaths(args);

  if (options.docs) {
    const results = readResults({ path: paths.json });
    const hardware = await getHardware();
    const environment = getEnvironment();

    const docs = createBenchmarkReadme({
      conclusion: args.conclusion,
      description: args.description,
      environment,
      dirname: lodash.last(path.dirname(args.filename).split("/")) as string,
      hardware,
      results,
    });

    const formattedDocs = await formatDocs({ docs });

    saveDocs({ path: paths.docs, docs: formattedDocs });

    createRootReadme();
  } else {
    const bench = new Bench(args.options);

    args.setup(bench);

    await bench.run();

    const sortedResults = sortResults({ results: bench.table() });

    saveResults({ path: paths.json, results: sortedResults });
  }
};
