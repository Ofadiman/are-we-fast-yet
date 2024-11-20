import url from "url";
import path from "path";
import simpleGit from "simple-git";

export const getSystemPaths = async (args: {
  importMetaUrl: string;
}): Promise<{
  filePath: string;
  dirName: string;
  fileName: string;
}> => {
  const git = simpleGit();

  const repoRoot: string = await git.revparse(["--show-toplevel"]);

  const filePath = path.relative(
    repoRoot,
    url.fileURLToPath(args.importMetaUrl),
  );

  return {
    filePath: filePath,
    fileName: path.parse(filePath).name,
    dirName: path.dirname(filePath),
  };
};
