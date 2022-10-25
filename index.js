#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

import {
  showSpinner,
  CreatDir,
  createPackegeJson,
  createTsConfig,
  initGit,
} from "./src/initProject.js";

let projectName;
let path;
let git;

console.log(chalk.bold(chalk.blue("Init-Typescript")));

async function start() {
  const project = await inquirer.prompt({
    name: "project_name",
    type: "input",
    message: "What is the name of your project?",
    default() {
      return "my-ts-app";
    },
  });

  git = await inquirer.prompt({
    name: "git",
    type: "confirm",
    message: "Git?",
    default() {
      return "y";
    },
  });

  projectName = project.project_name;
  initProject();
}

async function initProject() {
  path = await CreatDir(projectName);
  createPackegeJson(projectName, path);
  createTsConfig(path);
  if (git.git) {
    initGit(path);
  }
  showSpinner(projectName);
}

start();
