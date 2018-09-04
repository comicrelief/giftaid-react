import React, { Component } from 'react';
// import propTypes from 'prop-types';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import Cards from '../../components/Cards/Cards';

class Success extends Component {
  render() {
    /*    const hasState = this.props.location.state;
    const firstName = this.props.location.state.firstname;
    const giftAidChoice = this.props.location.state.giftAidChoice; */

    // HARDCODED DEBUG VALUES!
    const hasState = true;
    const firstName = 'Andy';
    const giftAidChoice = 1;

    return (
      <div>
        <PromoHeader />
        <div className="success-wrapper">
          <div className="success-wrapper--inner">

            {hasState && firstName !== undefined && giftAidChoice === 1 ?
              <div>
                <h1>Thank you, <br />{firstName}!</h1>
                <p>We’ve registered your Gift Aid declaration,
                   we’ll use it to pay for our operational costs.
                </p>
              </div>
              : null }

            {hasState && giftAidChoice === 0 ?
              <div>
                <h1>Thanks for letting us know</h1>
                <p>We won’t claim Gift Aid for your donation
                </p>
              </div>
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

/* Success.defaultProps = {
  history: { push: { } },
};

Success.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}; */

export default Success;
