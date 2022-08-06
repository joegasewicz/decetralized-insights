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
        assert.strictEqual(id, '1');
        assert.strictEqual(name, "d insights");
    });
    it("should let an admin add a new insight", async () => {
        await organisation.methods.addNewInsight(1, "car", "cars type", "a car").send({
            from: accounts[0],
            gas: "3000000",
        });
        const [ activities, item ] = await organisation.methods.getInsight(1).call();
        assert.notStrictEqual(activities, []);
        assert.strictEqual(item.id, '1');
        assert.strictEqual(item.name, "car");
        assert.strictEqual(item.it_type, "cars type");
        assert.strictEqual(item.description, "a car");
    });
    it("should let a recipient with a account add a new activity to an insight", async () => {
        // Create an insight
        await organisation.methods.addNewInsight(1, "diamond", "gem stones", "a diamond ring").send({
            from: accounts[0],
            gas: "3000000",
        });
        // Create & test the activity
        await organisation.methods.addNewActivity(1, "ring 1", "gem stones", "a diamond ring", 10, "joe goose", 1, "left factory", "left factory at X").send({
            from: accounts[1],
            gas: "3000000",
        });
        const [ activities, _ ] = await organisation.methods.getInsight(1).call();
        assert.strictEqual(activities.length, 1);
        assert.strictEqual(activities[0].id, "1");
        assert.strictEqual(activities[0].act_type, "left factory");
        assert.strictEqual(activities[0].description, "left factory at X");
        assert.strictEqual(activities[0].item.id, '1');
        assert.strictEqual(activities[0].item.name, "ring 1");
        assert.strictEqual(activities[0].item.it_type, "gem stones");
        assert.strictEqual(activities[0].item.description, "a diamond ring");
        assert.strictEqual(activities[0].recipient.id, "10");
        assert.strictEqual(activities[0].recipient.name, "joe goose");
        assert.strictEqual(activities[0].recipient.addr, accounts[1]);
    });
});
