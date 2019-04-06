const express = require("express");
const baseURL = "https://api.binance.com";
const binanceRoutes = express.Router();
const axios = require("axios");
const binance = require("node-binance-api");

binanceRoutes.route("/getpairs").get(function(req, res) {
  var data;
  axios.get(`${baseURL}/api/v1/exchangeInfo`).then(result => {
    var data = result.data.symbols.filter(item => {
      if (item.quoteAsset === "BTC") return item;
    });

    var filtereddata = {};

    Promise.all(
      data.map((item, id) => {
        return axios
          .get(`${baseURL}/api/v3/ticker/price?symbol=${item.symbol}`)
          .then(res2 => {
            filtereddata = {
              baseAsset: item.baseAsset,
              quoteAsset: item.quoteAsset,
              symbol: item.symbol,
              price: res2.data.price
            };
            return filtereddata;
          });
      })
    )
      .then(finalresult => {
        res.set({
          "Access-Control-Allow-Origin": "*"
        });
        res.send(finalresult);
      })
      .catch(err => {
        res.send(err);
      });
  });
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

module.exports = binanceRoutes;
