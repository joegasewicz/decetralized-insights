const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "organisation.sol");
const source = fs.readFileSync(contractPath, "utf8");

var input  = {
  language: "Solidity",
  sources: {
      "organisation.sol": {
          content: source
      }
  },
    settings: {
      outputSelection: {
          "*": {
              "*": ["*"]
          }
      }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
    bytecode: output.contracts["organisation.sol"].Organisation.evm.bytecode.object,
    abi: output.contracts["organisation.sol"].Organisation.abi,
}
