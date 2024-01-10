import express from "express";
import { getGeoData, getRegionData } from "../controllers/location.js";

const router = express.Router();

router.get("/geography", getGeoData);
router.get("/region", getRegionData);

export default router;
