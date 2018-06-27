/* eslint-env browser */

import React, { Component } from 'react';
import GiftAidForm from '../../components/GiftAidForm/GiftAidForm';

export default class Home extends Component {
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
      <main role="main">
        <section>
          <GiftAidForm />
        </section>
      </main>
    );
  }
}
