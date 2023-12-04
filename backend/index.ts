import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import wakeWorker from "./src/controllers/workerController";
import router from "./src/routes";

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

app.use(express.json());
app.use(errorHandler);
app.use(router);
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
