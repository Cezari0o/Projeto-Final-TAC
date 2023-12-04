import express from "express";
import { StatusCodes } from "http-status-codes";
import chartData from "./controllers/chartDataController";

const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .send(`CovidCharts API v${process.env.npm_package_version}`);
});

router.get("/badge-status", (req, res) => {
  res.status(StatusCodes.OK).json({
    schemaVersion: 1,
    label: "",
    message: "passing",
    color: "success",
  });
});

// router.use("/data", chartData);
router.use((req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: true, message: "Resource not found!" });
});

export default router;
