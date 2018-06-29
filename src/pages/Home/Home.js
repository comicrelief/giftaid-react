/* eslint-env browser */
import React, { Component } from 'react';
import GiftAidForm from '../../components/GiftAidForm/GiftAidForm';

export default class Home extends Component {
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
