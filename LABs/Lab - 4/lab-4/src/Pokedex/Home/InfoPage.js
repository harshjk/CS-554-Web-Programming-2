import React, { Component } from "react";
import { Link } from "react-router-dom";
//import CharacterList from "../CharacterList/CharacterList";

class InfoPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="character-search-page">
        <p className="App-intro">
          This is Pokedex, Here you can find all Pokemons, Berries, and Machines list.
        </p>
        <hr />
        <h3>
            <Link to={`/pokemon/`}>Pokemon List</Link>
        </h3>
        <h3>
            <Link to={`/berries/`}>Barries List</Link>
        </h3>
        <h3>
            <Link to={`/machines/`}>Machine List</Link>
        </h3>
      </div>
    );
  }
}
export default InfoPage;