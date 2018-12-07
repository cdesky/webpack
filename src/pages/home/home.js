import React, { Component } from "react";
import "./home.css"; 
import img from 'assets/images/upload.png';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div className="home">
        this is home~
        <a href="javascript:;" onClick={this.add}>
          加
        </a>
        <img src={img} />
      </div>
    );
  }
}
