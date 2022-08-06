import { Request, Response } from "express";

import { app, port } from "./api";
import { orgRoutes } from "./routes/organisations";


app.use("/organisation", orgRoutes);

app.listen(port, () => {
    console.log(`Starting server on port: ${port}`);
});
