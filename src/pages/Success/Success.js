import React, { Component } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import Cards from '../../components/Cards/Cards';
import SiteService from '../../service/Site.service';

class Success extends Component {
  /**
   * Success constructor
   */
  constructor() {
    super();
    this.site = new SiteService();
  }

  componentDidMount() {
    document.title = `Success${this.site.get('title_postfix')}`;
    if (typeof this.props.location.state === 'undefined') {
      this.goBack();
    }
  }

  /**
   * Go back to homepage
   */
  goBack() {
    this.props.history.push({
      pathname: '/',
    });
  }
  render() {
    return (
      <div>
        <PromoHeader />
        <div className="success-wrapper">
          <div className="success-wrapper--inner">
            {this.props.location.state && this.props.location.state.firstname !== undefined
              ? (
                <h1>Thank you, <br /> {this.props.location.state.firstname}!</h1>
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
