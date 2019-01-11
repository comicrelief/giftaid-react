import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup/PostcodeLookup';
import RadioButtons from '@comicrelief/storybook/src/components/RadioButtons/RadioButtons';
import defaultInputFieldsData from './defaultUpdateFields.json';

const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL + 'update';

let scrollTimeout;

const DONATION_TYPES = {
  SMS: 'sms',
  ONLINE: 'online',
  CALL_CENTRE: 'call centre',
};

/**
 * UpdateForm class
 * Returns elements on this form with default properties.
 */
class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validating: false,
      firstUpdate: false,
      formValidity: false,
      showErrorMessages: false,
      formDataError: null,
      formDataSuccess: null,
      urlTransID: this.props.match.params.transaction_id,
      postCodePattern: '[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}',
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
          valid: true,
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
        transactionId: {
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
        { label: 'SMS', value: DONATION_TYPES.SMS },
        { label: 'Online', value: DONATION_TYPES.ONLINE },
        { label: 'Call centre', value: DONATION_TYPES.CALL_CENTRE },
      ],
      hiddenFields: ['field-input--address1', 'field-input--town', 'field-wrapper--country'],
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
    this.url = null;
    this.timestamp = null;
    this.campaign = null;
  }
  /**
   * Updates our validation object accordingly, so we're not trying to validate nonexistent fields
   */
  componentDidMount() {
    this.props.updateHasCompleted(false);
    // If we've a transID in the url, remove valid obj for the transID input that won't be rendered
    if (this.state.urlTransID !== undefined) delete this.state.validation.transactionId;
    // Else, do the same for the donation type radiobuttons
    else delete this.state.validation.donationType;
  }

  /**
   * Deals with component update after pressing submit button
   */
  componentDidUpdate() {
    if (this.state.showErrorMessages && !this.state.formValidity && this.state.validating) {
      // timeout needed for error class names to appear
      scrollTimeout = setTimeout(() => { this.scrollToError(); }, 500);
    }
  }

  /**
   * Gets the timestamp and formats it
   * @return string
   */
  getTimestamp() {
    const getTimeStamp = Math.round((new Date()).getTime() / 1000);
    this.timestamp = new Date(getTimeStamp * 1000);
    return this.timestamp;
  }

  /**
   * Gets the campaign name based on the url
   * @param url
   * @return {*}
   */
  getCampaign(url) {
    // let campaign;
    if (url.includes('sportrelief')) {
      this.campaign = 'SR18';
    } else if (url.includes('rednoseday')) {
      this.campaign = 'RND19';
    } else {
      this.campaign = 'CR';
    }
    return this.campaign;
  }

  /**
   * Gets the current hostname.
   * Replaces 'localhost' to a default or uses the browser's current url.
   * @return string
   */
  getCurrentUrl() {
    // let url = null;
    if (window.location.hostname === 'localhost') {
      this.url = 'http://local.comicrelief.com';
    } else {
      this.url = window.location.href;
    }
    return this.url;
  }

  /**
   * Updates validation state
   * @param childState
   * @param name
   */
  setValidity(childState, name) {
    // stop from running too often
    if (this.state.validation[name] &&
      (this.state.validation[name].value === undefined ||
        this.state.validation[name].value !== childState.value)) {
      if (name === 'emailaddress' && childState.value === '') {
        this.setState({
          ...this.state,
          validation: {
            ...this.state.validation,
            emailaddress: {
              valid: true,
              value: childState.value,
              message: childState.message,
              showErrorMessage: false,
            },
          },
        });
      } else {
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
  }

  /**
   * Goes through field refs, gets the first erroring field and focuses on it,
   * uses additional to checks to suit specifc compnents
   */
  scrollToError() {
    this.setState({
      ...this.state,
      validating: false,
    });

    let item;
    let allClasses;

    // Scroll to the first erroring field
    const errorWrapper = document.querySelectorAll('.form__field--erroring')[0];

    for (let i = 0; i < this.fieldRefs.length; i += 1) {
      item = this.fieldRefs[i];
      allClasses = item.className;

      // If we find 'error' in THIS item's classes:
      if (allClasses.indexOf('error-outline') > -1 || allClasses.indexOf('erroring') > -1) {
        // If this id matches one of our hidden fields...
        /* eslint-disable no-loop-func */
        if (this.state.hiddenFields.some(key => item.id.indexOf(key) > -1)
          && document.querySelector('#address-detail .hide')) {
          document.querySelector('#field-wrapper--postcode').scrollIntoView('smooth');
        } else if (this.fieldRefs[i].nodeName === 'FIELDSET') {
          // Else, if this is a radio button...
          errorWrapper.scrollIntoView('smooth');
        } else {
          // Otherwise, this is a normal text input field
          errorWrapper.scrollIntoView('smooth');
          document.querySelector('#' + item.id).focus();
        }
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
    if (this.state.urlTransID !== undefined && allFields.transactionId !== undefined) {
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
    if (this.state.showErrorMessages === false && this.state.formValidity === true) {
      // this.submitForm();

      const url = this.getCurrentUrl();
      const campaign = this.getCampaign(url);
      let donationID = '';
      let donationType = DONATION_TYPES.ONLINE;

      // Set this var depending on how the user has inputted their transID
      if (this.state.validation.transactionId) {
        donationID = this.state.validation.transactionId.value;
      } else {
        donationID = this.state.urlTransID;
      }

      // Overwrite the empty string with the value if it exists
      if (typeof this.state.validation.donationType !== 'undefined') {
        donationType = this.state.validation.donationType.value;
      }

      const formValues = {
        campaign,
        transSource: `${campaign}_GiftAidUpdate`,
        transSourceUrl: url,
        transType: 'GiftAidUpdate',
        timestamp: this.getTimestamp(),
        email: this.state.validation.emailaddress.value,
        postcode: this.state.validation.postcode.value,
        donationID,
        donationType,
        firstname: this.state.validation.firstname.value,
        lastname: this.state.validation.lastname.value,
        address1: this.state.validation.address1.value,
        address2: this.state.validation.address2.value,
        address3: this.state.validation.address3.value,
        town: this.state.validation.town.value,
        country: this.state.validation.country.value,
        confirm: this.state.validation.giftAidClaimChoice.value,
      };

      // post form data and settings to endpoint
      axios.post(ENDPOINT_URL, formValues)
        .then(() => {
          this.props.updateHasCompleted(true);
          this.props.history.push({
            pathname: '/update/success',
            state: {
              firstname: this.state.validation.firstname.value,
              giftAidChoice: formValues.confirm,
            },
          });
        })
        .catch((error, response) => {
          console.log(error, response);

          this.props.history.push({
            pathname: '/update/sorry',
          });
        });
    }
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
        validating: false,
      }, this.submitForm);
    }

    if (anyInvalidFields === true) {
      this.setState({
        ...this.state,
        formValidity: false,
        showErrorMessages: true,
        validating: true,
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
        { this.state.urlTransID ?
          <p className="text-align-centre transaction-id">
            Transaction ID: {this.state.urlTransID}
          </p>
          :
          null }
      </div>
    );
  }

  renderDonationTypeButtons() {
    if (this.state.urlTransID) {
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
                pattern={this.state.postCodePattern}
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
            >Update Declaration
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
