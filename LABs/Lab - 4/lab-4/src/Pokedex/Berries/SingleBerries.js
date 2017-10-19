/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 16 2017
 *  File : SingleBerries.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

class SingleBerries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berrie: undefined,
      loading: false
    };
  }

  async loadBerrieById(berrieId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`berry/${berrieId}`);
      const berrie = response.data;
      this.setState({ loading: false, berrie });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const berrieId = this.props.match.params.id;
    await this.loadBerrieById(berrieId);
  }

  async componentWillReceiveProps(nextProps) {
    const berrieId = nextProps.match.params.id;
    const oldBerrieId = this.props.match.params.id;

    if (berrieId !== oldBerrieId) {
      await this.loadBerrieById(berrieId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    }
    else if (this.state.berrie) {
      const url = this.props.match.url;
      body = (
        <div>
          <h2><small>Berry Name: </small> {this.state.berrie.name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          })}</h2>
          <div className="row">
            <div className="col-12 col-md-8">
              <p>Natural Gift Power: {this.state.berrie.natural_gift_power}</p>
              <p>Growth Time: {this.state.berrie.growth_time} </p>
              <p>Size: {this.state.berrie.size}</p>
              <p>Smoothness: {this.state.berrie.smoothness}</p>
            </div>
          </div>
        </div>
      );
    } else {
      body = <div />
    }

    return <div className="single-berry-page">{body}</div>;
  }
}

export default SingleBerries;
