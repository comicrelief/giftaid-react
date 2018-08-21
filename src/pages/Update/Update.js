import React, { Component } from 'react';

class Update extends Component {
  renderFormHeader() {
    return (
      <div>
        <h1 className="giftaid-title">
          <span className="visually-hidden">
            Giftaid it
          </span>
        </h1>
        <h2 className="sub-title">
          Edit your Giftaid declaration
        </h2>
        <p> We can claim Gift Aid from personal donations made by UK taxpayers:
          the Government gives us back 25% of their value.
        </p>
        { this.props.match.params.transaction_id ?
          <p className="text-align-centre transaction-id">
            Transaction ID: {this.props.match.params.transaction_id}
          </p>
          :
          null }

      </div>
    );
  }

  render() {
    return (
      <main role="main">
        <section>
          <form
            id="form--update"
            noValidate
            className="update-giftaid__form"
          >
            {this.renderFormHeader()}
            {/* { this.createInputFields() } */}
            <button
              type="submit"
              className="btn btn--red"
              /* onClick={e => this.validateForm(e)} */
            >Gift Aid your donation
            </button>
            {/* {this.renderJustInTimeMessage() */ }
          </form>
        </section>
      </main>
    );
  }
}

export default Update;
