const keccak = require("keccak");
const secp256k1 = require("secp256k1");
const randomBytes = require("randombytes");

const ADDRESS_SIZE = 40;

const privateKeyToAddress = (privateKey) => {
  const pub = secp256k1.publicKeyCreate(privateKey, false).slice(1);
  return keccak("keccak256").update(pub).digest().slice(-20).toString("hex");
};

const generateRandomWallet = () => {
  const randbytes = randomBytes(32);
  return {
    address: privateKeyToAddress(randbytes).toString("hex"),
    privateKey: randbytes.toString("hex"),
  };
};

const isValidChecksum = (address, input) => {
  const hash = keccak("keccak256").update(address).digest().toString("hex");
  const shift = ADDRESS_SIZE - input.length;
  for (let i = 0; i < input.length; i++) {
    const j = i + shift;
    if (
      input[i] !==
      (parseInt(hash[j], 16) >= 8 ? address[j].toUpperCase() : address[j])
    ) {
      return false;
    }
  }
  return true;
};
const isValidAddress = (address, input) => {
  const subStr = address.substr(ADDRESS_SIZE - input.length);
  if (input !== subStr) {
    return false;
  }
  return isValidChecksum(address, input);
};

const isNaHex = (string) => {
  const rule = /^[a-fA-F0-9]+$/g;
  return !rule.test(string);
};

const getChecksumAddress = (address) => {
  const hash = keccak("keccak256").update(address).digest().toString("hex");
  let ret = "";
  for (let i = 0; i < address.length; i++) {
    ret += parseInt(hash[i], 16) >= 8 ? address[i].toUpperCase() : address[i];
  }
  return "0x" + ret;
};

const getVanityWallet = (input, timeout = 10000) => {
  return new Promise((resolve, _) => {
    let wallet = generateRandomWallet();
    const start = Date.now();
    while (
      Date.now() - start < timeout &&
      !isValidAddress(wallet.address, input)
    ) {
      wallet = generateRandomWallet();
    }
    resolve({
      desiredInputReached: isValidAddress(wallet.address, input),
      address: getChecksumAddress(wallet.address),
      privateKey: wallet.privateKey,
    });
  });
};

const getRandomWallet = () => {
  const wallet = generateRandomWallet();
  wallet.address = getChecksumAddress(wallet.address);
  return wallet;
};

module.exports = {
  isNaHex,
  getRandomWallet,
  getVanityWallet,
};
