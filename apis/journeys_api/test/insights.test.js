const assert  = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compile = require("../compile");

const web3 = new Web3(ganache.provider());
let accounts;
let organisation;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // select account to deploy contract
    organisation = await new web3.eth.Contract(compile.abi)
        .deploy({
            data: compile.bytecode,
            arguments: [
                1,
                "d insights",
                accounts[1],
            ]
        })
        .send({
            from : accounts[0],
            gas: "3000000",
        });
});


describe("organisation", () => {
    it("deploys a contract", async () => {
        const id = await organisation.methods.id().call();
        const name = await organisation.methods.name().call();
        assert.strictEqual(id, "1");
        assert.strictEqual(name, "d insights");
    });
    it("should let an admin add a new insight", async () => {
        await organisation.methods.addNewInsight("1", "car", "cars type", "a car").send({
            from: accounts[0],
            gas: "3000000",
        })
        const insight = await organisation.methods.insights("1").call();
        assert.strictEqual(insight.id, "1");
        assert.strictEqual(insight.activities, undefined);
        assert.strictEqual(insight.item.id, "1");
        assert.strictEqual(insight.item.name, "car");
        assert.strictEqual(insight.item.it_type, "cars type");
        assert.strictEqual(insight.item.description, "a car");
    });
});
