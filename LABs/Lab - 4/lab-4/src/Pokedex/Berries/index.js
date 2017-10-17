/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 09 2017
 *  File : index.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import SingleBerries from './SingleBerries';
import BerriesList from './BerriesList';

class Berries extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <div className="berries-page">
        <Switch>
          <Route path={`${url}/page/:page`} component={BerriesList} />
          <Route path={`${url}/:id`} component={SingleBerries} />
          <Redirect from="/" to={`${url}/page/0`} />
        </Switch>
      </div>
    );
  }
}

export default Berries;