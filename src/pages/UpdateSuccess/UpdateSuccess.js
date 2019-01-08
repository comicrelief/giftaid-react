import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import Cards from '../../components/Cards/Cards';

class UpdateSuccess extends Component {
  render() {
    const hasState = this.props.location.state;
    const firstName = this.props.location.state.firstname;

    // Since this is a string representation of a boolean value in this example, cast it
    const giftAidChoice = parseInt(this.props.location.state.giftAidChoice, 10);

    return (
      <div>
        <PromoHeader />
        <div className="success-wrapper update-success-wrapper">
          <div className="success-wrapper--inner">

            {hasState && firstName !== undefined && giftAidChoice === 1
              ? (
                <div>
                  <h1>Thank you, <br /> {firstName}!</h1>
                  <p>
                    We’ve registered your Gift Aid declaration,
                   we’ll use it to pay for our operational costs.
                  </p>
                </div>
              )
              : null }

            {hasState && giftAidChoice === 0
              ? (
                <div>
                  <h1>Thanks for letting us know</h1>
                  <p>
                    We won’t claim Gift Aid for your donation
                  </p>
                </div>
              )
              : null }

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

export default UpdateSuccess;
