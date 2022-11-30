const { keyLowerSuggestions } = require("../data/input-suggestions");
const { isNaHex } = require("../services/keygen.service");

// Actions
const random = "Create random key pairs";
const vanity = "Create a vanity key pairs";
const validate = "Validate address";
const actionChoices = [random, vanity, validate];

// Vanity operations
const createOwnHex = "Create my own hex string";
const suggestHexKeys = "Suggest my some hex string";
const vanityOpsChoices = [createOwnHex, suggestHexKeys];

const survey = [
  {
    type: "list",
    name: "action",
    message: "What action do you want to perform?",
    choices: [...actionChoices],
  },
  {
    type: "text",
    name: "ethAddressToValidate",
    message: "Type your ETH address",
    when: (answer) => answer.action === validate,
  },
  {
    type: "list",
    name: "vanitySelectedOp",
    message: "How do you prefer to generate your hexadecimal suffix?",
    choices: [...vanityOpsChoices],
    when: (answer) => answer.action === vanity,
  },
  {
    type: "text",
    name: "vanityInput",
    message: "Type your own hex suffix",
    when: (answer) =>
      answer.action === vanity && answer.vanitySelectedOp === createOwnHex,
    validate: (answer) => {
      if (isNaHex(answer)) {
        return "Invalid hex format. You can use only A-F, a-f or 0-9";
      }
      return true;
    },
  },
  {
    type: "suggest",
    name: "vanityInput",
    message: "Select your favourite option",
    when: (answer) =>
      answer.action === vanity && answer.vanitySelectedOp === suggestHexKeys,
    suggestions: keyLowerSuggestions,
  },
  {
    type: "number",
    name: "vanityTimeout",
    message:
      "Selected vanity input could take a while... how many seconds do you want to wait? (default 10 seconds)",
    when: (answer) =>
      answer.action === vanity && answer.vanityInput.length >= 3,
  },
];

module.exports = { survey, random, validate, vanity };
