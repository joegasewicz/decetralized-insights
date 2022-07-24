const assert  = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compile = require("../compile");

const web3 = new Web3(ganache.provider());
let accounts;
let insights;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // select account to deploy contract
    insights = await new web3.eth.Contract(compile.abi)
        .deploy({
            data: compile.bytecode,
            arguments: [
                "Shell",
                "Joe 1",
                "tester",
                "Gov",
                "Petroleum",
                1,
                "Crude",
                "12/12/12",
                "13/13/13"
            ]
        })
        .send({
            from : accounts[0],
            gas: "1000000",
        });
});


describe("Insights", () => {
    it("deploys a contract", () => {
        console.log(insights);
    });
});
