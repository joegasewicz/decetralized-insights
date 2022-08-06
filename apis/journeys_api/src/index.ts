import { Request, Response } from "express";

import { app, port } from "./api";

app.listen(port, () => {
    console.log(`Starting server on port: ${port}`);
});
