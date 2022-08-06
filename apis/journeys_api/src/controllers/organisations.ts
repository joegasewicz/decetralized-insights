import {Request, Response} from "express";
import Web3 from "web3";
import {OrgProvider} from "../services/provider";
import Config from "../config";
import {Contract} from "../services/contract";


export const postNewOrganisation = async (req: Request, res: Response) => {
    const config = new Config();
    const diProvider = new OrgProvider(config.SECRET_PHRASE, config.API_ENDPOINT);
    const provider = diProvider.getProvider();
    const web3 = new Web3(provider);
    try {
        const accounts = await web3.eth.getAccounts();

        // get body
        const org_id = req.body.org_id;
        const org_name = req.body.org_name;
        const recipient_addr = req.body.recipient_addr;

        if (!org_id || org_name || recipient_addr !== accounts[1]) {
            res.status(400);
            res.json({
                error: "Incorrect request values",
            });
            req.next();
        }

        // compile latest contract
        const contract = new Contract();
        contract.compile();


        const args = [org_id, org_name, recipient_addr];

        try {
            const result = await new web3.eth.Contract(contract.abi)
                .deploy({ data: contract.bytecode, arguments: args })
                .send({ gas: 3000000, from: accounts[0]});
            provider.engine.stop();

            res.json({
                data: {
                    id: result,
                },
            });
            req.next();
        } catch (err) {
            res.status(500);
            res.json({
                error: err,
            });
            req.next();
        }

    } catch (err: any) {
        res.status(500);
        res.json({
            error: err,
        });
        req.next();
    }


};
