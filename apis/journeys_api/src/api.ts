import * as express from "express";
import bodyParser from "body-parser";

import { orgRoutes } from "./routes/organisations";
import {accountRoutes} from "./routes/accounts";

export const app = express();

// Routes
app.use("/organisation", orgRoutes);
app.use("/accounts", accountRoutes);
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

export const port = 3000;
