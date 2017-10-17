/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 09 2017
 *  File : PokemonList.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonsResultList: [],
      next: "",
      previous: "",
      totalPokemons: "",
      loading: false,
      page: null
    };
  }

  async getPokimonList(page) {
    try {
      this.setState({ loading: true });
      const offset = page * 10;
      let url = `pokemon/?limt=10&offset=${offset}`;
      if (page === 0) {
        let url = `pokemon/?limt=10`;
      }

      const response = await axiosInstance.get(url);
      const resultSet = response.data.results;
      const nextURL = response.data.next;//.replace('https://pokeapi.co/api/v2/', '');
      const previousURL = response.data.previous//.replace('https://pokeapi.co/api/v2/', '');
      const count = response.data.count;

      this.setState({ loading: false, pokemonsResultList: resultSet, next: nextURL, previous: previousURL, totalPokemons: count, page });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const page = this.props.match.params.page;
    await this.getPokimonList(page);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldPageNumber = this.props.match.params.page;

    if (pageNumber !== oldPageNumber) {
      await this.getPokimonList(pageNumber);
    }
  }

  render() {
    let body = null;
    let previousPageNumber = this.state.page - 1;
    let nextPageNumber = parseInt(this.state.page) + 1;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.pokemonsResultList.length !== 0) {
      const pokemonDisplays = this.state.pokemonsResultList.map(pokemon => {
        return (
          <li>
            <Link to={"/" + pokemon.url.replace('https://pokeapi.co/api/v2/', '')}>{pokemon.name}</Link>
          </li>
        );
      });
      body = (<div className="row">
        <ul>
          {pokemonDisplays}
        </ul>
      </div>);
    } else {
      body = <div className="row">No Pokemons yet!</div>;
    }
    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Pokemons</h2>
            <h3>Total Pokemons: {this.state.totalPokemons}</h3>
            <div>
              {body}
            </div>
            <div className="PageNation">
              <Link to={`/pokemon/page/${previousPageNumber}`}><button className="" disabled={!this.state.previous}>Previous</button></Link>
              <Link to={`/pokemon/page/${nextPageNumber}`}><button className="" disabled={!this.state.next}>Next</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PokemonList;