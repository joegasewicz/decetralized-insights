const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compile = require("./compile");
const API_ENDPOINT = "https://rinkeby.infura.io/v3/0e0fc99b32cf43cabbce107512ebf93e";
const provider = new HDWalletProvider(
"primary very behind toddler fancy select roof thing apple vague quote trend",
    API_ENDPOINT,
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("accounts: ", accounts[0]);
    const args = [
        1,
        "d insights",
        accounts[1],
    ];
    const result = await new web3.eth.Contract(compile.abi)
        .deploy({ data: compile.bytecode, arguments: args })
        .send({ gas: "3000000", from: accounts[0] });
    console.log("Contract deployed to: ", result.options.address);
    provider.engine.stop(); // prevent hanging deploy
};

deploy();
