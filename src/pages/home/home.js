/* eslint-env browser */

import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import GiftAidForm from '../../components/GiftAidForm/GiftAidForm';


const inputFieldOverrides = {
  firstName: {
    label: 'burre',
  },
  lastName: {
    label: 'bliep',
  },
};

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
        <PromoHeader
          scrollToForm={this.scrollTo}
        />
        <section>
          <GiftAidForm {... { inputFieldOverrides }} />
        </section>
      </main>
    );
  }
}
