const cli = require("inquirer");
cli.registerPrompt("suggest", require("inquirer-prompt-suggest"));

const { survey } = require("./survey");
const { actions } = require("./actions");
const { title, block } = require("./print");

title("ETH key pair gen");
block(
  "Welcome to ETH key pair generator",
  `With this CLI tool, you will be able to create and validate random and vanity key pairs to use in ETH ecosystem.`
);
cli.prompt(survey).then(actions);

module.exports = { cli };
