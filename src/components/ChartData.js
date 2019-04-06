import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import candlestick from "fusioncharts/fusioncharts.powercharts";
ReactFC.fcRoot(FusionCharts, candlestick);

export default class ChartData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      newData:[],
      chartConfigs: {
        type: "candlestick",
        renderAt: "chart-container",
        id: "myChart",
        width: "700",
        height: "400",
        dataFormat: "json",
        dataSource: {
          chart: {
            theme: "fusion",
            caption: "Daily Stock Price HRYS",
            subCaption: "Last 2 months",
            numberprefix: "BTC",
            vNumberPrefix: " ",
            pyaxisname: "Price",
            vyaxisname: "Volume (In Millions)",
            toolTipColor: "#e1e1e1",
            toolTipBorderThickness: "0",
            toolTipBgColor: "#000000",
            toolTipBgAlpha: "80",
            toolTipBorderRadius: "2",
            toolTipPadding: "5"
          },
          categories: [
            {
              category: [
                {
                  label: "2 month ago",
                  x: "1"
                },
                {
                  label: "1 month ago",
                  x: "31"
                },
                {
                  label: "Today",
                  x: "60"
                }
              ]
            }
          ],
          dataset: [
            {
              data: this.state && this.state.chartData
            }
          ]
        }
      }
    };
  }
  componentDidMount() {
    const socket = socketIOClient("http://localhost:5000");
    socket.emit("chartdata", this.props.symbol);
    socket.on("chartdata", data => {
      this.setState(
        {
          chartData: data
        },
        () => {
          this.setData();
        }
      );
    });
  }

  setData = () => {
    var chartData = this.state.chartData;
    var newdata = [...this.state.newData];

    this.setState({
        newData:[...this.state.newData, this.state.chartData]
    })
  };
  render() {
    var chartConfigs = {
      type: "candlestick",
      renderAt: "chart-container",
      id: "myChart",
      width: "700",
      height: "400",
      dataFormat: "json",
      dataSource: {
        chart: {
          theme: "fusion",
          caption: "Daily Stock Price HRYS",
          subCaption: "Last 2 months",
          numberprefix: "$",
          vNumberPrefix: " ",
          pyaxisname: "Price",
          vyaxisname: "Volume (In Millions)",
          toolTipColor: "#e1e1e1",
          toolTipBorderThickness: "0",
          toolTipBgColor: "#000000",
          toolTipBgAlpha: "80",
          toolTipBorderRadius: "2",
          toolTipPadding: "5"
        },
        categories: [
          {
            category: [
              {
                label: "2 month ago",
                x: "1"
              },
              {
                label: "1 month ago",
                x: "31"
              },
              {
                label: "Today",
                x: "60"
              }
            ]
          }
        ],
        dataset: [
          {
            data: this.state.newData ? this.state.newData : ""
          }
        ]
      }
    };

    console.log(this.state.newData)


    return <ReactFC {...chartConfigs} />;
  }
}
