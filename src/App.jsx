/* eslint-env browser */
import React, { Component } from 'react';
import Header from './components/Header';
import PromoHeader from './components/PromoHeader';
import './App.scss';

class App extends Component {
  scrollTo(target) {
    let targetElementId = '';
    // if target is an event by an anchor tag get the target id through the href
    if (target.target.type === 'click') {
      target.preventDefault();
      targetElementId = target.target.getAttribute('href');
    }
    const targetElement = document.querySelector(targetElementId);
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
