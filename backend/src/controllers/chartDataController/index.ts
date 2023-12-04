import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const chartData = Router();

chartData.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    rodando: true,
  });
});

export default chartData;
