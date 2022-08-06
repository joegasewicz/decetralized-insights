import {Request, Response} from "express";
import Web3 from "web3";
import {OrgProvider} from "../services/provider";
import Config from "../config";


export const postNewOrganisation = async (req: Request, res: Response) => {
    const config = new Config();
    const diProvider = new OrgProvider(config.SECRET_PHRASE, config.API_ENDPOINT);
    const web3 = new Web3(diProvider.getProvider());
    try {
        const accounts = await web3.eth.getAccounts();
        const args = [1, "d insights", accounts[1]];



        res.json({
            data: {
                accounts: accounts,
            },
        });
    } catch (err: any) {
        res.status(500);
        res.json({
            error: err,
        });
    }


};
