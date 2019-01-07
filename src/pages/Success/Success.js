import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import Cards from '../../components/Cards/Cards';

class Success extends Component {
  render() {
    return (
      <div>
        <PromoHeader />
        <div className="success-wrapper">
          <div className="success-wrapper--inner">
            {this.props.location.state && this.props.location.state.firstname !== undefined
              ? (
                <h1>Thank you, {this.props.location.state.firstname}!</h1>
              )
              : <h1>Thank you!</h1>
            }
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
