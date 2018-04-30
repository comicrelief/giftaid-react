/* eslint-env browser */
import React, { Component } from 'react';
import Header from './components/Header';
import PromoHeader from './components/PromoHeader';
import './App.scss';

class App extends Component {
  scrollTo(target) {
    console.log('target', target);
  }
  render() {
    return (
      <div className="App">
        <Header
          campaign="SportRelief"
        />
        <main role="main">
          <PromoHeader
            scrollToForm={this.scrollTo}
          />
        </main>
      </div>
    );
  }
}

export default App;
