#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

import {
  showSpinner,
  CreatDir,
  createPackegeJson,
  createTsConfig,
} from "./src/initProject.js";

let projectName;
let path;

console.log(chalk.bold(chalk.blue("Init-Typescript")));

async function askProjectName() {
  const answers = await inquirer.prompt({
    name: "project_name",
    type: "input",
    message: "What is the name of your project?",
    default() {
      return "my-ts-app";
    },
  });

  projectName = answers.project_name;
  initProject();
}

async function initProject() {
  path = await CreatDir(projectName);
  createPackegeJson(projectName, path);
  createTsConfig(path);
  showSpinner(projectName);
}

askProjectName();
