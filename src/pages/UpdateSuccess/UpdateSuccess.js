import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import Cards from '../../components/Cards/Cards';
import SiteService from '../../service/Site.service';

class UpdateSuccess extends Component {
  /**
   * Success constructor
   */
  constructor() {
    super();
    this.site = new SiteService();
    this.hasState = null;
    this.firstName = null;
    this.giftAidChoice = null;
  }

  componentDidMount() {
    document.title = `Success${this.site.get('title_postfix')}`;
    if (typeof this.props.location.state === 'undefined' || typeof this.props.location.state.firstname === 'undefined') {
      this.goBack();
    } else {
      this.hasState = this.props.location.state;
      this.firstName = this.props.location.state.firstname;

      // Since this is a string representation of a boolean value in this example, cast it
      this.giftAidChoice = parseInt(this.props.location.state.giftAidChoice, 10);
    }
  }

  /**
   * Go back to homepage
   */
  goBack() {
    this.props.history.push({
      pathname: '/update',
    });
  }
  render() {
    return (
      <div>
        <PromoHeader />
        <div className="success-wrapper update-success-wrapper">
          <div className="success-wrapper--inner">

            {this.hasState && this.firstName !== undefined && this.giftAidChoice === 1
              ? (
                <div>
                  <h1>Thank you, <br /> {this.firstName}!</h1>
                  <p>
                    We’ve registered your Gift Aid declaration,
                   we’ll use it to pay for our operational costs.
                  </p>
                </div>
              )
              : null }

            {this.hasState && this.giftAidChoice === 0
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
