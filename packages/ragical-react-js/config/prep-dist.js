const fs = require("fs");

const distRoot = `${__dirname}/../dist`;

const packageJson = require("../package.json");

delete packageJson.scripts;

const distPackageJson =
  JSON.stringify(
    packageJson,
    (_key, value) => {
      if (typeof value === "string" && value.startsWith("./src/")) {
        const parts = value.split("/");
        parts.splice(1, 1); // remove dist
        return parts.join("/").replace(".ts", ".js");
      }
      return value;
    },
    2
  ) + "\n";

// Save the modified package.json to "dist"
fs.writeFileSync(`${distRoot}/package.json`, distPackageJson);
