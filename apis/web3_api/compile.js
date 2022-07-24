const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "Insights.sol");
const source = fs.readFileSync(contractPath, "utf8");

var input  = {
  language: "Solidity",
  sources: {
      "Insights.sol": {
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

module.exports = output["contracts"]["Insights.sol"].Insights;
