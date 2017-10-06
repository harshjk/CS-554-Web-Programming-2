import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const title = "React Pokedex";

ReactDOM.render(<App title={title} author="Phil"/>, document.getElementById('root'));
registerServiceWorker();
