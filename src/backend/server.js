const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
const cors = require("cors");
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const binanceRoute = require("./api/routes");

app.use("/binance", binanceRoute);

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
