import { createSpinner } from "nanospinner";
import makeDir from "make-dir";
import { execSync, exec } from "child_process";
import { execa } from "execa";
import chalk from "chalk";
import fs from "fs";
import os from "os";

export function showSpinner(name) {
  const spinner = createSpinner(`Init typescript project (${name})`).start();

  setTimeout(() => {
    spinner.success();
  }, 1000);
}

export async function CreatDir(name) {
  const path = await makeDir(name);
  return path;
}

export async function createPackegeJson(name, path) {
  const PackageJson = {
    name: name,
    main: "index.ts",
    version: "0.1.0",
    description: "",
    license: "MIT",
    author: `${os.userInfo().name}`,
    scripts: {
      start: "tsm index.ts",
      build: "tsc",
      format: "prettier --config .prettierrc '*.ts' --write",
    },
  };
  fs.writeFileSync(
    path + "/package.json",
    JSON.stringify(PackageJson, null, 4)
  );
  fs.writeFileSync(path + "/index.ts", `console.log("Hello ${name}")`);
  fs.writeFileSync(path + "/.prettierrc.json", "{}");

  execSync("npm i typescript tsm prettier -D", { cwd: path });
}

export async function initGit(path) {
  exec('git init', {
    cwd: path
  }, function(error, stdout, stderr) {
    if (error) {
      console.error(
        chalk.red("Could not init git repo; Make sure you have it installed!")
      );
      process.exit(0);
    }
  });
}

export async function createTsConfig(path) {
  const tsConfig = `{
    "compilerOptions": {
      /* Visit https://aka.ms/tsconfig to read more about this file */
      "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
      "module": "commonjs",                                /* Specify what module code is generated. */
      "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
      "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
      "strict": true,                                      /* Enable all strict type-checking options. */
      "skipLibCheck": true,                                /* Skip type checking all .d.ts files. */
      "outDir": "./out"
    }
}`;
  fs.writeFileSync(path + "/tsconfig.json", tsConfig);
}
