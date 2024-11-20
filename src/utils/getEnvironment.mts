import childProcess from "child_process";

export const getEnvironment = () => {
  const os = childProcess
    .execSync("cat /etc/os-release")
    .toString()
    .split("\n")
    .reduce((accumulator, line) => {
      const [key, value] = line.split("=") as [string, string];
      if (key === "PRETTY_NAME") {
        return value;
      }

      return accumulator;
    }, "Unknown")
    .replaceAll('"', "");

  return {
    npm: childProcess.execSync("npm --version").toString().trim(),
    node: childProcess.execSync("node --version").toString().trim(),
    tsx: childProcess
      .execSync("tsx --version")
      .toString()
      .split("\n")[0]!
      .split(" ")[1]!
      .trim(),
    os: os,
  };
};
