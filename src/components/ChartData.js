import React, { Component } from "react";
import socketIOClient from "socket.io-client";

export default class ChartData extends Component {
  componentDidMount() {
    const socket = socketIOClient("http://localhost:5000");
    socket.emit("chartdata", this.props.symbol);
    socket.on("chartdata", data => {
      console.log(data);
    });
  }
  render() {
    return <div />;
  }
}
