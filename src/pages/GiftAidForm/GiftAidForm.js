import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup/PostcodeLookup';
import MarketingConsent from '@comicrelief/storybook/src/components/MarketingConsent/MarketingConsent';
import defaultInputFieldsData from './defaultGiftaidFields.json';
import SiteService from '../../service/Site.service';
import marketingConsentData from './marketingConsentData.json';

const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL;

let scrollTimeout;
/**
 * GiftAidForm class
 * Returns elements on this form with default properties.
 * Input field properties can be overridden by passing in a inputFieldOverrides object with the
 * same structure as the defaultInputFieldProps object, e.g.:
 * inputFieldOverrides = {
 *   firstName: {
 *     label: 'some text',
 *   },
 * }
 */
class GiftAidForm extends Component {
  constructor(props) {
    super(props);
    this.site = new SiteService();
    this.state = {
      validating: false,
      inputFieldProps: [],
      firstUpdate: false,
      formValidity: false,
      showErrorMessages: false,
      formDataError: null,
      formDataSuccess: null,
      validation: {
        confirm: {
          valid: false,
          value: undefined,
          message: '',
        },
        mobile: {
          valid: false,
          value: undefined,
          message: '',
        },
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
        emailConsent: {
          isFieldsHidden: false,
          value: null,
          valid: true,
          fieldValidation: {},
        },
        postConsent: {
          isFieldsHidden: false,
          value: null,
          valid: true,
          fieldValidation: false,
        },
        phoneConsent: {
          isFieldsHidden: false,
          value: null,
          valid: true,
          fieldValidation: false,
        },
        smsConsent: {
          isFieldsHidden: false,
          value: null,
          valid: true,
          fieldValidation: false,
        },
      },

      hiddenFields: ['field-input--address1', 'field-input--town', 'field-wrapper--country'],
    };
    // Put the field refs from children into an array
    const refs = [];
    this.setRef = (element) => {
      if (element) {
        // fields from postcode lookup
        if (element.fieldRefs) {
          element.fieldRefs.forEach(item => refs.push(item));
        } else {
          // remaining input fields
          refs.push(element.inputRef);
        }
        this.fieldRefs = refs;
      }
    };
    this.url = null;
    this.timestamp = null;
    this.campaign = null;
    this.justInTimeLinkText = 'Why do we collect this info?';
    this.formHeaderHidden = 'Giftaid it';
  }

  /**
   * Merges any overrides to the default input field data json with it
   */
  componentDidMount() {
    this.setInputField();
    this.props.submitHasCompleted(false);
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

  setInputField() {
    this.setState({
      inputFieldProps: this.mergeInputFieldProps(defaultInputFieldsData),
    });
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
   * Gets the current hostname.
   * Replaces 'localhost' to a default or uses the browser's current url.
   * @return string
   */
  getCurrentUrl() {
    if (window.location.hostname === 'localhost') {
      this.url = 'http://local.comicrelief.com';
    } else {
      this.url = window.location.href;
    }
    return this.url;
  }

  /**
   * Updates validation state
   * @param name
   * @param newStateField
   */
  setValidity(name, newStateField) {
    if (name && newStateField) {
      this.setState((prevState) => {
        let newState;
        const prevStateField = prevState.validation[name];
        const fieldUndefined = prevStateField === undefined;
        const newValue = fieldUndefined === false && prevStateField.value !== newStateField.value;
        const marketingConsentFieldsChanged = fieldUndefined === false &&
          (newStateField.fieldValidation !== prevStateField.fieldValidation);

        if (fieldUndefined === true || newValue === true || marketingConsentFieldsChanged === true) {
          newState = {
            ...prevState,
            validation: {
              ...prevState.validation,
              [name]: newStateField,
            },
          };
        }
        return newState;
      });
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
    const inputFields = [];
    Object.entries(this.state.inputFieldProps).map(([field, props]) => inputFields.push(<InputField
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
      isValid={(valid, name) => { this.setValidity(name, valid); }}
    />));
    return inputFields;
  }

  /**
   * Merge default input field properties with overrides.
   * @returns {object}
   */
  mergeInputFieldProps(defaultInputFieldsProps) {
    const inputFields = defaultInputFieldsProps;
    const overrides = this.props.inputFieldOverrides;
    Object.entries(overrides).forEach(([key]) => {
      Object.assign(inputFields[key], overrides[key]);
    });
    return inputFields;
  }

  /**
   * Creates formValues object and submits form
   */
  submitForm() {
    if (this.state.showErrorMessages !== false && this.state.formValidity !== true) {
      return false;
    }

    const url = this.getCurrentUrl();
    const campaign = this.site.get('campaign').name;
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
      if (key === 'confirm') {
        value = this.state.validation[key].value === true ? 1 : 0;
      }
      // set values for marketing consent checkboxes and fields
      if (/Consent$/.test(key) && value !== null) {
        if (value === 'yes' && this.state.validation[key].fieldValidation !== false) {
          const fields = this.state.validation[key].fieldValidation;
          Object.keys(fields).forEach(name => fieldValues[name] = fields[name].value);
        }
        value = value === 'no' ? 0 : 1;
      }

      fieldValues[key] = value;
    });

    // Combine all form data and settings
    const formValues = Object.assign({}, fieldValues, settings);

    // post form data and settings to endpoint
    axios.post(ENDPOINT_URL, formValues)
      .then(() => {
        this.props.submitHasCompleted(true);
        this.props.history.push({
          pathname: '/success',
          state: { firstname: formValues.firstname },
        });
      })
      .catch(() => {
        this.props.history.push({
          pathname: '/sorry',
        });
      });

    return true;
  }

  /**
   * Checks if any field is invalid.
   * If invalid fields: shows error sets state to show errorMessages.
   * If all fields valid: sets form validity to true
   * @param e
   */
  validateForm(e) {
    e.preventDefault();
    //  check for invalid fields
    let validity = true;
    Object.keys(this.state.validation).map((key) => {
      if (this.state.validation[key].valid !== true) {
        validity = false;
      }
      return true;
    });
    console.log('validity', validity);
    // update state accordingly
    if (validity !== true) {
      return this.setState({
        ...this.state,
        formValidity: false,
        showErrorMessages: true,
        validating: true,
      });
    }

    return this.setState({
      ...this.state,
      formValidity: true,
      showErrorMessages: false,
      validating: false,
    }, this.submitForm);
  }

  /**
   * Renders out the just in time message
   */
  renderJustInTimeMessage() {
    return (
      <JustInTime linkText={this.justInTimeLinkText}>
        <p>
          <strong>
            Name, phone number and address:
            {' '}
          </strong>
          we need these details to process a Gift Aid claim on your donation.
        </p>
      </JustInTime>
    );
  }

  renderFormHeader() {
    return (
      <div>
        <h1 className="giftaid-title">
          <span className="visually-hidden">
            { this.formHeaderHidden }
          </span>
        </h1>
        <h2 className="sub-title">
          Gift aid your donation and the
          {' '}
          <strong>
            Government will give us 25%
          </strong>
          {' '}
            on top of it.
        </h2>
      </div>
    );
  }


  render() {
    const { formDataSuccess, formDataError } = this.state;
    return (
      <main role="main">
        <section>
          <form
            id="form"
            noValidate
            className="giftaid__form"
            data-success={formDataSuccess}
            data-error={formDataError}
          >
            {this.renderFormHeader()}
            { this.createInputFields() }
            <PostcodeLookup
              ref={this.setRef}
              label="Postal address"
              showErrorMessages={this.state.showErrorMessages}
              isAddressValid={
                (validation) => {
                  Object.keys(validation).map(key => this.setValidity(key, validation[key]));
                }
              }
            />
            <MarketingConsent
              getValidation={(validation) => {
                Object.keys(validation).forEach(key => this.setValidity(key, validation[key]));
              }}
              itemData={marketingConsentData}
            />
            <button
              type="submit"
              className="btn btn--red"
              onClick={e => this.validateForm(e)}
            >
Gift Aid your donation
            </button>
            {this.renderJustInTimeMessage()}
          </form>
        </section>
      </main>
    );
  }
}

GiftAidForm.defaultProps = {
  inputFieldOverrides: {},
  // history: { push: { } },
};

GiftAidForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
  // history: propTypes.shape({
  //   push: propTypes.func,
  // }),
};

export default GiftAidForm;
