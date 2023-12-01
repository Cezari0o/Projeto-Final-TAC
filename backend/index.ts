import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import wakeWorker from "./src/controllers/workerController";

dotenv.config();
wakeWorker();

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(cors({}));

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res
      .status(
        err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({ error: true, message: err.message });
    return;
  }
  next();
};

app.get("", (req, res) => {
  res.send("Olá mundo!");
});

app.use(express.json());
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
