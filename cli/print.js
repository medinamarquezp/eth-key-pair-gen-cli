const chalk = require("chalk");
const figlet = require("figlet");

const title = (message) => {
  console.log(
    chalk.bold.red(
      figlet.textSync(message, {
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const block = (title, message) => {
  const topLineCornersSize = 10;
  const lineLength = title.length + 2 + topLineCornersSize * 2;
  const breakRegex = new RegExp(`(.{${lineLength}})`, "g");
  const generateLine = (length) => `-`.repeat(length);
  console.log(`
  ${generateLine(topLineCornersSize)} ${title} ${generateLine(
    topLineCornersSize
  )}\n
  ${message.replace(breakRegex, `$1\n`)}\n
  ${generateLine(lineLength)}\n
  `);
};

const jsonString = (json) => console.log(JSON.stringify(json));

const ok = (message) =>
  console.log(`${String.fromCodePoint(0x2705)} ${chalk.green(message)}`);

const ko = (message) =>
  console.log(`${String.fromCodePoint(0x274c)} ${chalk.red(message)}`);

const ghost = (message) =>
  console.log(`${String.fromCodePoint(0x1f47b)} ${chalk.gray(message)}`);

const info = (message) =>
  console.log(`${String.fromCodePoint(0x1f916)} ${chalk.cyan(message)}`);

module.exports = {
  title,
  block,
  jsonString,
  ok,
  ko,
  ghost,
  info,
};
