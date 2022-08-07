import * as express from "express";
import bodyParser from "body-parser";

import { orgRoutes } from "./routes/organisations";
import {accountRoutes} from "./routes/accounts";

export const app = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
// Routes
app.use("/organisation", orgRoutes);
app.use("/accounts", accountRoutes);


export const port = 4000;
