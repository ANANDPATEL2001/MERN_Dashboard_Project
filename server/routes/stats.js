import express from "express";
import { getPerformanceData, getStatData } from "../controllers/stats.js";

const router = express.Router();

router.get("/data", getStatData);
router.get('/performance', getPerformanceData)

export default router;
