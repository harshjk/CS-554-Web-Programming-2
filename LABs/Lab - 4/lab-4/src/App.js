import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Pokedex from "./Pokedex";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>
              <Link to="/">{this.props.title}</Link>
            </h2>
            <cite>
              Brought to you by {this.props.author}
            </cite>
          </div>
          <div className="App-body">
            <Switch>
              <Route path="/" component={Pokedex} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
