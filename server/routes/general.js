import express from "express";
import { getData, getTopicData, getUser, getYearData } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/topic", getTopicData);
router.get("/year", getYearData);
router.get("/data", getData);

export default router;
