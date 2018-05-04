/* eslint-env browser */
import Footer from '@comicrelief/storybook/src/components/Footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Home from '../../pages/home/home';
import Header from '../Header/Header';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </Router>
        <Footer campaign="comicrelief" />
      </div>
    );
  }
}

export default App;