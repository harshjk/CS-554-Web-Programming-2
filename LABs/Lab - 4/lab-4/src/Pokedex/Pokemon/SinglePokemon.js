/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 09 2017
 *  File : SinglePokemon.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
/* import CharacterDetail from "./CharacterDetail";
import CharacterComicList from "./CharacterComicList"; */

class SinglePokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: undefined,
      loading: false
    };
  }

  async loadPokemonById(pokemonId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`pokemon/${pokemonId}`);
      const pokemon = response.data;
      this.setState({ loading: false, pokemon });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const pokemonId = this.props.match.params.id;
    await this.loadPokemonById(pokemonId);
  }

  async componentWillReceiveProps(nextProps) {
    const pokemonId = nextProps.match.params.id;
    const oldPokemonId = this.props.match.params.id;

    if (pokemonId !== oldPokemonId) {
      await this.loadPokemonById(pokemonId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.pokemon) {
      const url = this.props.match.url;
      body = (
        <div>
          <h2><small>Pokemon Name: </small> {this.state.pokemon.name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          })}</h2>
          <div className="row">
            <div className="col-12 col-md-8">
              <p>Base Experience: {this.state.pokemon.base_experience}</p>
              <p>Height: {this.state.pokemon.height} </p>
              <p>Weight: {this.state.pokemon.weight}</p>
            </div>
            <div className="col-6 col-md-4">
              <img src={this.state.pokemon.sprites.front_default} alt={this.state.pokemon.name} />
            </div>

          </div>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-pokemon-page">{body}</div>;
  }
}

export default SinglePokemon;
