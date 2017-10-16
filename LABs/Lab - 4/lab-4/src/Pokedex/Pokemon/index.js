import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import SinglePokemon from './SinglePokemon';
import PokemonList from './PokemonList';

class Pokemon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <div className="pokemon-page">
        <Switch>
          <Route path={`${url}/page/:page`} component={PokemonList} />
          <Route path={`${url}/:id`} component={SinglePokemon} />
          <Redirect from="/" to={`${url}/page/0`} />
        </Switch>
      </div>
    );
  }
}

export default Pokemon;