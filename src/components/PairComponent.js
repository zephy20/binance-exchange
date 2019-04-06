import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import PairWidget from "./PairWidget";
import TradeHistory from "./TradeHistory";
import ChartData from "./ChartData";

export default class PairComponent extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div style={{ padding: "5%" }}>
        <div className="row">
          <div className="col-md-4 col-xs-12">
            <PairWidget symbol={this.props.match.params.id} />
          </div>

          <div className="col-md-5 col-xs-12">
            <p className="h4">Chart Data</p>
            <ChartData symbol={this.props.match.params.id} />
          </div>

          <div className="col-md-3 col-xs-12">
            <p className="h4">Trade History</p>
            <TradeHistory symbol={this.props.match.params.id} />
          </div>
        </div>
      </div>
    );
  }
}
