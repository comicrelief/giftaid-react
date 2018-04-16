/* eslint-env browser */
import React, { Component } from 'react';
import Header from './components/header';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header
          campaign="SportRelief"
        />
      </div>
    );
  }
}

export default App;
