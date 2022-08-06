import { Request, Response } from "express";

import { app, port } from "./api";
import { orgRoutes } from "./routes/organisations";
import {accountRoutes} from "./routes/accounts";


app.use("/organisation", orgRoutes);
app.use("/accounts", accountRoutes);

app.listen(port, () => {
    console.log(`Starting server on port: ${port}`);
});
