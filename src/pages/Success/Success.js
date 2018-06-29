import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import Cards from '../../components/Cards/Cards';
import './Success.scss';

class Success extends Component {
  render() {
    const formFieldName = 'user name';
    return (
      <div>
        <PromoHeader />
        <div className="success-wrapper">
          <div className="success-wrapper--inner">
            <h1>Thank you, <br />{formFieldName}!</h1>
            <p>
              We’ve registered your Gift Aid declaration, we’ll use it to pay for our operational
              costs.
            </p>
            <h2>Your donation makes a big difference</h2>
            <p>
              Comic Relief currently supports more than 2,000 projects in the UK and around
              the world, tackling issues like gender injustice and mental illness.
            </p>
            <p>These are some of the people we helped last year:</p>
          </div>
          <Cards />
        </div>
      </div>
    );
  }
}

export default Success;
