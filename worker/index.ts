import express, { Application } from "express";

const app: Application = express();

const port = process.env.PORT || 3001;

app.get("/worker", (req, res) => {
  res.send("Olá mundo!");
});

app.listen(port, () => {
  console.log(`Worker rodando na porta ${port}.`);
});
