import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup/PostcodeLookup';
import RadioButtons from '@comicrelief/storybook/src/components/RadioButtons/RadioButtons';
import defaultInputFieldsData from './defaultUpdateFields.json';

const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL;
let scrollTimeout;

/**
 * UpdateForm class
 * Returns elements on this form with default properties.
 */
class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstUpdate: false,
      formValidity: false,
      showErrorMessages: false,
      formDataError: null,
      formDataSuccess: null,
      transID: this.props.match.params.transaction_id,
      validation: {
        firstname: {
          valid: false,
          value: undefined,
          message: '',
        },
        lastname: {
          valid: false,
          value: undefined,
          message: '',
        },
        emailaddress: {
          valid: false,
          value: undefined,
          message: '',
        },
        postcode: {
          valid: false,
          value: undefined,
          message: '',
        },
        address1: {
          valid: false,
          value: undefined,
          message: '',
        },
        address2: {
          valid: true,
          value: undefined,
          message: '',
        },
        address3: {
          valid: true,
          value: undefined,
          message: '',
        },
        town: {
          valid: false,
          value: undefined,
          message: '',
        },
        country: {
          valid: false,
          value: undefined,
          message: '',
        },
        giftAidClaimChoice: {
          valid: false,
          value: undefined,
          message: '',
        },
        donationType: {
          valid: false,
          value: undefined,
          message: '',
        },
      },
      giftAidButtonChoices: [
        {
          label: 'Yes, I would like Comic Relief to claim Gift Aid on my donation',
          additionalText: '&#42; By ticking I state I am a UK taxpayer making a personal donation and understand' +
          'that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my ' +
          'donations, it is my responsibility to pay any difference. [Find out more](http://www.comicrelief.com)',
          value: 1,
        },
        {
          label: 'No',
          value: 0,
        },
      ],
      donationTypeChoices: [
        { label: 'SMS', value: 'sms' },
        { label: 'Online', value: 'online' },
        { label: 'Call centre', value: 'callcentre' },
      ],
    };
    // Put the field refs from children into an array
    const refs = [];
    this.setRef = (element) => {
      if (element) {
        // fields from postcode lookup
        if (element.fieldRefs) {
          element.fieldRefs.forEach(item => refs.push(item));
        } else if (element.inputRef) {
          // remaining input fields
          refs.push(element.inputRef);
        } else {
          refs.push(element.radioButtonRef);
        }
        this.fieldRefs = refs;
      }
    };
  }

  /**
   * Deals with component update after pressing submit button
   */
  componentDidUpdate() {
    if (this.state.showErrorMessages === true && this.state.formValidity === false) {
      // timeout needed for error class names to appear
      scrollTimeout = setTimeout(() => { this.scrollToError(); }, 500);
      this.setErrorMessagesToFalse();
    }
    if (this.state.showErrorMessages === false && this.state.formValidity === true) {
      this.submitForm();
    }
  }

  /**
   * Gets the timestamp and formats it
   * @return string
   */
  getTimestamp() {
    const getTimeStamp = Math.round((new Date()).getTime() / 1000);
    const timestamp = new Date(getTimeStamp * 1000);
    return timestamp;
  }

  /**
   * Gets the campaign name based on the url
   * @param url
   * @return {*}
   */
  getCampaign(url) {
    let campaign;
    if (url.includes('sportrelief')) {
      campaign = 'SR18';
    } else if (url.includes('rednoseday')) {
      campaign = 'RND19';
    } else {
      campaign = 'CR';
    }
    return campaign;
  }

  /**
   * Gets the current hostname.
   * Replaces 'localhost' to a default or uses the browser's current url.
   * @return string
   */
  getCurrentUrl() {
    let url = null;
    if (window.location.hostname === 'localhost') {
      url = 'http://local.comicrelief.com';
    } else {
      url = window.location.href;
    }
    return url;
  }

  /**
   * Updates validation state
   * @param name
   * @param valid
   */
  setValidity(childState, name) {
    if (name && childState) {
      this.setState((prevState) => {
        let newState;
        // If we already have saved validation object for this field
        if (prevState.validation[name] !== undefined &&
          // AND that object is empty OR the saved value isnt the same as our new childstate value
          (prevState.validation[name].value === undefined ||
            prevState.validation[name].value !== childState.value)) {
          // .. then create a new state object, copying the current state, adding the
          // current validation state plus the new value
          newState = {
            ...this.state,
            validation: {
              ...this.state.validation,
              [name]: childState,
            },
          };
        }
        return newState;
      });
    }
  }

  setErrorMessagesToFalse() {
    this.setState({
      ...this.state,
      showErrorMessages: false,
    });
  }

  /**
   * Goes through field refs, gets the first erroring field and focuses on it.
   * If inputelement.labels is not supported: scrolls form into view
   */
  scrollToError() {
    let item;
    for (let i = 0; i <= this.fieldRefs.length; i += 1) {
      item = this.fieldRefs[i];

      // Customise this function for Radiobutton's markup
      if (this.fieldRefs[i].nodeName === 'FIELDSET') {
        // Gets the error div always added at the end
        let lastChildErr = this.fieldRefs[i].children.length - 1;
        lastChildErr = this.fieldRefs[i].children[lastChildErr].className.includes('error');
        if (lastChildErr) {
          item.scrollIntoView('smooth');
          item.focus();
          break;
        }
      } else if (this.fieldRefs[i].labels !== undefined) {
        const classes = this.fieldRefs[i].labels[0].getAttribute('class');
        if (classes.includes('error')) {
          item.labels[0].scrollIntoView('smooth');
          item.focus();
          break;
        }
      } else {
        document.querySelector('form').scrollIntoView();
        break;
      }
    }
    clearTimeout(scrollTimeout);
  }

  /**
   * Maps the input field properties to a new array containing the input field instances
   * @returns {Array}
   */
  createInputFields() {
    const allFields = defaultInputFieldsData;

    // Remove the transaction id field if not value is present in the url
    if (this.state.transID !== undefined && allFields.transactionId !== undefined) {
      delete allFields.transactionId;
    }

    const inputFields = [];
    Object.entries(allFields).map(([field, props]) => inputFields.push(<InputField
      ref={this.setRef}
      key={field}
      id={props.id}
      type={props.type}
      name={props.name}
      label={props.label}
      required={props.required}
      pattern={props.pattern}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      defaultChecked={props.defaultChecked}
      helpText={props.helpText}
      emptyFieldErrorText={props.emptyFieldErrorText}
      invalidErrorText={props.invalidErrorText}
      setBackgroundColor={props.type === 'checkbox'}
      additionalText={props.additionalText}
      showErrorMessage={this.state.showErrorMessages}
      isValid={(valid, name) => { this.setValidity(valid, name); }}
    />));
    return inputFields;
  }

  /**
   * Creates formValues object and submits form
   */
  submitForm() {
    const url = this.getCurrentUrl();
    const campaign = this.getCampaign(url);
    // required settings to post to api endpoint
    const settings = {
      campaign,
      transSource: `${campaign}_GiftAid`,
      transSourceUrl: url,
      transType: 'GiftAid',
      timestamp: this.getTimestamp(),
    };

    // create field values
    const fieldValues = {};
    Object.keys(this.state.validation).forEach((key) => {
      let value = this.state.validation[key].value;
      // todo deal with the value output in InputField component
      if (key === 'confirm') {
        value = this.state.validation[key].value === true ? 1 : 0;
      }
      fieldValues[key] = value;
    });

    // Combine all form data and settings
    const formValues = Object.assign({}, fieldValues, settings);

    // post form data and settings to endpoint
    axios.post(ENDPOINT_URL, formValues)
      .then(() => {
        this.props.history.push({
          pathname: '/update/success',
          state: {
            firstname: formValues.firstname,
            giftAidChoice: formValues.giftAidClaimChoice,
          },
        });
      })
      .catch(() => {
        this.props.history.push({
          // TODO: do we need a Update-specific Sorry page?
          pathname: '/sorry',
        });
      });
  }

  /**
   * Checks if any field is invalid.
   * If invalid fields: shows error sets state to show errorMessages.
   * If all fields valid: sets form validity to true
   * @param e
   */
  validateForm(e) {
    e.preventDefault();
    // Put field validation into new array to check for invalid fields
    const allFieldsToCheck = [];

    Object.keys(this.state.validation).forEach((key) => {
      allFieldsToCheck.push(this.state.validation[key].valid);
    });

    // Values can be 'null' or empty strings, so check if our array contains a 'not true' value
    const anyInvalidFields = allFieldsToCheck.some(element => element !== true);

    // Update state accordingly
    if (anyInvalidFields === false) {
      this.setState({
        ...this.state,
        formValidity: true,
        showErrorMessages: false,
      });
    }

    if (anyInvalidFields === true) {
      this.setState({
        ...this.state,
        formValidity: false,
        showErrorMessages: true,
      });
    }
  }

  /**
   * Renders out the just in time message
   */
  renderJustInTimeMessage() {
    const justInTimeLinkText = 'Why do we collect this info?';
    return (
      <JustInTime linkText={justInTimeLinkText}>
        <p>
          <strong>Name, email and address: </strong>
          we need this information to identify your donation
          and update the gift aid status on your donation.
        </p>
        <p>We will only use your phone number to match your SMS donations to your gift aid status.
        </p>
      </JustInTime>
    );
  }
  renderFormHeader() {
    return (
      <div>
        <h1 className="giftaid-title">
          <span className="visually-hidden">
            Giftaid it
          </span>
        </h1>
        <h2 className="sub-title">
          Edit your Gift Aid declaration
        </h2>
        <p className="text-align-centre">
          We can claim Gift Aid from personal donations made by UK taxpayers:
          the Government gives us back 25% of their value.
        </p>
        { this.state.transID ?
          <p className="text-align-centre transaction-id">
            Transaction ID: {this.state.transID}
          </p>
          :
          null }
      </div>
    );
  }

  renderDonationTypeButtons() {
    if (this.state.transID) {
      return (
        <div>
          <h3 className="form--update__title form--update__title--donation text-align-centre">
            How did you make the donation?
          </h3>

          <RadioButtons
            id="donationType"
            name="donationType"
            label="How did you make your donation?"
            required
            options={this.state.donationTypeChoices}
            showErrorMessage={this.state.showErrorMessages}
            ref={this.setRef}
            isValid={(state, id) => { this.setValidity(state, id); }}
          />
        </div>
      );
    } return null;
  }

  renderGiftAidClaimChoiceButtons() {
    return (
      <div>
        <h3 className="form--update__title text-align-centre">
          Your Gift Aid declaration
        </h3>

        <RadioButtons
          id="giftAidClaimChoice"
          name="giftAidClaimChoice"
          label="Can we claim Gift Aid on your donation?"
          required
          options={this.state.giftAidButtonChoices}
          showErrorMessage={this.state.showErrorMessages}
          ref={this.setRef}
          isValid={(state, id) => { this.setValidity(state, id); }}
        />
      </div>
    );
  }

  render() {
    return (
      <main role="main">
        <section>
          <form
            id="form"
            noValidate
            className="update-giftaid__form"
          >
            {this.renderFormHeader()}

            <div className="form-fields--wrapper">

              {this.renderDonationTypeButtons()}

              <h3 className="form--update__title form--update__title--giftaid text-align-centre">
                Who is changing their declaration?
              </h3>

              { this.createInputFields() }

              <PostcodeLookup
                ref={this.setRef}
                label="Postal address"
                showErrorMessages={this.state.showErrorMessages}
                isAddressValid={
                  (validation) => {
                    Object.keys(validation).map(key => this.setValidity(validation[key], key));
                  }
                }
              />

            </div>

            { this.renderGiftAidClaimChoiceButtons() }

            <button
              type="submit"
              className="btn btn--red"
              onClick={e => this.validateForm(e)}
            >Update Gift Aid Declaration
            </button>
            {this.renderJustInTimeMessage()}

          </form>
        </section>
      </main>
    );
  }
}

UpdateForm.defaultProps = {
  history: { push: { } },
};

UpdateForm.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
};

export default UpdateForm;
