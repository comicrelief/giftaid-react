import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';


class Success extends Component {
  render() {
    return (
      <div>
        <PromoHeader />
        <div>
          <h1>Thank you, [user name]!</h1>
          <p>
          We’ve registered your Gift Aid declaration, we’ll use it to pay for our operational costs.
          </p>
          <h2>Your donation makes a big difference</h2>
          <p>
            Comic Relief currently supports more than 2,000 projects in the UK and around the world,
            tackling issues like gender injustice and mental illness.
          </p>
          <p>These are some of the people we helped last year:</p>
          <a href="https://www.comicrelief.com/your-impact" classNameName="btn btn-red">Read More</a>
        </div>
      </div>
    );
  }
}

export default Success;
