const express = require("express");
const baseURL = "https://api.binance.com";
const binanceRoutes = express.Router();
const axios = require("axios");
const Binance = require("node-binance-api");
const binance = new Binance();
const io = require("socket.io")();
const port = 5000 || process.env.PORT;

global.ticker = {};

binanceRoutes.route("/getpairs").get(function(req, res) {
  var data;
  axios.get(`${baseURL}/api/v3/ticker/price`).then(result => {
    data = result.data.filter(item => {
      if (item.symbol.includes("BTC", 3)) return item;
    });
    res.set({
      "Access-Control-Allow-Origin": "*"
    });
    res.send(data);
  });

  var filtereddata = {};
});
binanceRoutes.route("/getlatestpricesymbol").get(function(req, res) {
  axios
    .get(`${baseURL}/api/v3/ticker/price?symbol=${req.query.symbol}`)
    .then(result => {
      res.set({
        "Access-Control-Allow-Origin": "*"
      });
      res.send(result.data);
    })
    .catch(err => {
      res.status(400).send("Unable to get data");
    });
});

binanceRoutes.route("/getlatestpricesymbolofall").get(function(req, res) {
  axios
    .get(`${baseURL}/api/v3/ticker/price?symbol=${req.query.symbol}`)
    .then(result => {
      res.set({
        "Access-Control-Allow-Origin": "*"
      });
      res.send(result.data);
    })
    .catch(err => {
      res.status(400).send("Unable to get data");
    });
});



binanceRoutes.route("/getdetailsofsymbol").get(function(req, res) {
  
  axios
    .get(`${baseURL}/api/v1/ticker/24hr?symbol=${req.query.symbol}`)
    .then(result => {
      res.set({
        "Access-Control-Allow-Origin": "*"
      });
      res.send(result.data);
    })
    .catch(err => {
      res.status(400).send("Unable to get data");
    });
});

module.exports = binanceRoutes;
