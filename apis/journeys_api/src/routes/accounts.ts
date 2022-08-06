import * as express from "express";
import {Request, Response} from "express";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import {getAccounts} from "../controllers/accounts";


const router = express.Router();

export const accountRoutes = router
    .get("/", getAccounts);
