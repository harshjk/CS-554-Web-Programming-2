/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 09 2017
 *  File : index.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import SinglePokemon from './SinglePokemon';
import PokemonList from './PokemonList';

class Characters extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-1">
          <Switch>
            <Route path={`${url}/:id`} component={SinglePokemon} />
            <Route path={`${url}/page/:page`} component={PokemonList} />
            <Redirect from="/" to="/page/0" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Characters;