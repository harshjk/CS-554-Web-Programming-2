/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 09 2017
 *  File : index.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import SingleMachine from './SingleMachine';
import MachineList from './MachineList';

class Machine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <div className="machine-page">
        <Switch>
          <Route path={`${url}/page/:page`} component={MachineList} />
          <Route path={`${url}/:id`} component={SingleMachine} />
          <Redirect from="/" to={`${url}/page/0`} />
        </Switch>
      </div>
    );
  }
}

export default Machine;