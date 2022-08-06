import {NextFunction, Request, Response} from "express";
import Web3 from "web3";
import {OrgProvider} from "../services/provider";
import Config from "../config";
import {Contract} from "../services/contract";

export const postNewOrganisation = async (req: Request, res: Response, next: NextFunction) => {
    const config = new Config();
    const diProvider = new OrgProvider(config.SECRET_PHRASE, config.API_ENDPOINT);
    const provider = diProvider.getProvider();
    const web3 = new Web3(provider);
    try {
        const accounts = await web3.eth.getAccounts();
        const org_id = req.body.org_id;
        const org_name = req.body.org_name;
        const recipient_addr = req.body.recipient_addr;

        if (!org_id || !org_name || recipient_addr !== accounts[1]) {
            res.status(400);
            res.json({
                error: "Incorrect request values",
            });
            return;
        }
        const contract = new Contract();
        contract.getFromBin();
        const args = [1, "d insights", accounts[1]];
        try {
            const result = await new web3.eth.Contract(contract.abi)
                .deploy({ data: contract.bytecode, arguments: args })
                .send({ gas: 3000000, from: accounts[0]});
            provider.engine.stop();

            res.json({
                data: {
                    address: result.options.address,
                },
            });
            return;
        } catch (err) {
            res.status(500);
            res.json({
                error: err,
                reason: "Couldn't create contract"
            });
            return;
        }
    } catch (err: any) {
        res.status(500);
        res.json({
            error: err,
        });
        return;
    }
};
