/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 16 2017
 *  File : SingleMachines.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

class SingleMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: undefined,
      loading: false
    };
  }

  async loadMachineById(machineId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`machine/${machineId}`);
      const machine = response.data;
      this.setState({ loading: false, machine });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const machineId = this.props.match.params.id;
    await this.loadMachineById(machineId);
  }

  async componentWillReceiveProps(nextProps) {
    const machineId = nextProps.match.params.id;
    const oldMachineId = this.props.match.params.id;

    if (machineId !== oldMachineId) {
      await this.loadMachineById(machineId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.machine) {
      const url = this.props.match.url;
      body = (
        <div>
          <h2><small>Item Name: </small> {this.state.machine.item.name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          })}</h2>
          <div className="row">
            <div className="col-12 col-md-8">
              <p>Move Name: {this.state.machine.move.name}</p>
              <p>Version Group: {this.state.machine.version_group.name} </p>
            </div>
          </div>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-machine-page">{body}</div>;
  }
}

export default SingleMachine;