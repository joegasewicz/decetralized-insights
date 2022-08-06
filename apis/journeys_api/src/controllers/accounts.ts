import {Request, Response} from "express";
import Web3 from "web3";
import {OrgProvider} from "../services/provider";
import Config from "../config";


export const getAccounts = (req: Request, res: Response) => {
    const config = new Config();
    const diProvider = new OrgProvider(config.SECRET_PHRASE, config.API_ENDPOINT);
    const web3 = new Web3(diProvider.getProvider());
    web3.eth.getAccounts()
        .then(accounts => {
            console.log('accounts: ', accounts);
            res.json({
                data: {
                    accounts: accounts,
                },
            });
            return;
        })
        .catch(err => {
            res.json({
                error: err,
            });
            return;
        });
};
