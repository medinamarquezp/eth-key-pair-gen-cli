const ora = require("ora");
const { utils } = require("ethers");
const { random, validate, vanity } = require("./survey");
const {
  getRandomWallet,
  getVanityWallet,
} = require("../services/keygen.service");
const { jsonString, ghost, ok, ko } = require("./print");

const actions = (data) => {
  switch (data.action) {
    case random:
      printRandomWallet();
      break;
    case vanity:
      printVanityWallet(data);
      break;
    case validate:
      validateAddress(data);
      break;
    default:
      ghost("Action not found!");
      break;
  }
};

const printRandomWallet = () => {
  const randomWallet = getRandomWallet();
  jsonString(randomWallet);
};

const printVanityWallet = async (data) => {
  const { vanityInput, vanityTimeout } = data;
  const timeout = vanityTimeout ? vanityTimeout * 1000 : 10000;
  spinner = ora("Generating vanity key pair...").start();
  const { desiredInputReached, address, privateKey } = await getVanityWallet(
    vanityInput,
    timeout
  );
  spinner.stop();
  if (!desiredInputReached) {
    ghost("Timeout exceeded, generated a random key pair");
  }
  jsonString({ address, privateKey });
};

const validateAddress = (data) => {
  const isValid = utils.isAddress(data.ethAddressToValidate);
  if (isValid) {
    ok(`Your ETH address is valid! (${data.ethAddressToValidate})`);
  } else {
    ko(`Your ETH address is invalid! (${data.ethAddressToValidate})`);
  }
};

module.exports = { actions };
