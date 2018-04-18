/* eslint-env browser */
import React, { Component } from 'react';
import Header from './components/header';
import PromoHeader from './components/promoHeader';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header
          campaign="SportRelief"
        />
        <main role="main">
          <PromoHeader />
        </main>
      </div>
    );
  }
}

export default App;
