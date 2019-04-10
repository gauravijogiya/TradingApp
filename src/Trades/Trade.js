import React, { Component } from 'react';
import axios from 'axios';
import TradeTableData from './tradeTableData.js';

import "bootstrap/dist/css/bootstrap.css";

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tradesList: [],
      searchString: "",
      pagination: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    let url = 'http://blockchaintech-code-test.herokuapp.com/trades.json?filter[createdAt][gte]=2018-01-01&&filter[created][lte]=2018-12-31&&filter[tradingPair][symbol][inq]=BTC/AUD&&filter[tradingPair][symbol][inq]=ETH/AUD&&number=3&&pagination[size]=5';
    axios.get(url)
      .then(response => {
        let data = response.data.trades;

        this.setState({
          tradesList: data
        })
      })
  }

  handleChange(event) {
    this.setState({ searchString: event.target.value });
    //debugger;
  }

  sortBy(sortByVariable) {

    console.log(sortByVariable);
    //debugger;
    //let tL = this.state.tradesList.sort((a, b) => ( a[sortByVariable] > b[sortByVariable]    ));
      this.setState({
      tradesList:this.state.tradesList.sort((a,b)=> ( a[sortByVariable] - b[sortByVariable]    ))
    })
  }



  render() {
    let tradesList = this.state.tradesList.filter((list) => {
      return list.uuid.indexOf(this.state.searchString) !== -1 || list.price.indexOf(this.state.searchString) !== -1;
    });
    console.log(tradesList);
    return (
      <div>
        <input className="prompt"
          onChange={this.handleChange}
          onKeyPress={this.handleChange}
          type="text"
          placeholder="Search" />

        <TradeTableData tradesList={tradesList} sortBy={this.sortBy} />
      </div>
    );
  }
}
