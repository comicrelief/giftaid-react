/* eslint-env browser */
import React, { Component } from 'react';
import Header from './components/Header';
import PromoHeader from './components/PromoHeader';
import './App.scss';

class App extends Component {
  scrollTo(event) {
    let id;
    event.preventDefault();
    // if target is an event by an anchor tag get the target id through the href
    if (event.target.href !== undefined) {
      id = event.target.getAttribute('href');
    }
    const targetElement = document.querySelector(id);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
