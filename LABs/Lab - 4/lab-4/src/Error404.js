/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 16 2017
 *  File : 404.js
 *******************************************/
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

class Error404 extends Component {
  render() {
    return (
      <h1>404 - Oops Page Not Found!</h1>
    );
  }
}

export default Error404;
