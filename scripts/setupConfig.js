const fs = require("fs");
const chalk = require("chalk");

const configTemplate = fs.readFileSync(`${process.cwd()}/template/proxy.json`);

fs.writeFileSync(`${process.cwd()}/proxy.json`, configTemplate);

console.log(chalk.green("generate proxy.json successfully!"));
