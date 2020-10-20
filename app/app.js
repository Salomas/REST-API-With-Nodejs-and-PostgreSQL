const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");

const routescities = require("../routes/city");
const routesforecasts = require("../routes/forecasts");
const routesweathers = require("../routes/weathers");

app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, x-requested-with, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/city", routescities);
app.use("/forecast", routesforecasts);
app.use("/weather", routesweathers);

app.use((req, res, next) => {
  const erro = new Error("Route not found");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
