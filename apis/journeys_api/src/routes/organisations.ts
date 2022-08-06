import * as express from "express";
import {postNewOrganisation} from "../controllers/organisations";

const router = express.Router();

export const orgRoutes = router.post("/", postNewOrganisation);
