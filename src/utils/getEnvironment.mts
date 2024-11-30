import childProcess from "child_process";

export const getEnvironment = () => {
  const osRelease = childProcess
    .execSync("cat /etc/os-release")
    .toString()
    .split("\n")
    .reduce<Record<string, string>>((accumulator, line) => {
      const [key, value] = line.split("=") as [string, string];
      accumulator[key] = value;
      return accumulator;
    }, {});

  const os = `${osRelease["ID"]}@${osRelease["VERSION_ID"]!.replaceAll('"', "")}`;
  const npm = `npm@${childProcess.execSync("npm --version").toString().trim()}`;
  const tsx = `tsx@${childProcess
    .execSync("tsx --version")
    .toString()
    .split("\n")[0]!
    .split(" ")[1]!
    .trim()
    .replaceAll("v", "")}`;
  const node = `node@${childProcess.execSync("node --version").toString().trim().replaceAll("v", "")}`;

  return {
    npm,
    node,
    tsx,
    os,
  };
};
