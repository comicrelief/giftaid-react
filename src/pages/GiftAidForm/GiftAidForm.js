/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup/PostcodeLookup';
import defaultInputFieldsData from './defaultGiftaidFields.json';

const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL;
const CAMPAIGN = 'CR';
const TRANS_SOURCE = 'giftaid-react';


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
    this.state = {
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
      },
    };
  }

  componentWillMount() {
    this.setState({
      inputFieldProps: this.mergeInputFieldProps(defaultInputFieldsData),
    });
  }

  /**
   * Gets the timestamp and format
   * @return string
   */
  getTimestamp() {
    const getTimeStamp = Math.round((new Date()).getTime() / 1000);
    const timestamp = new Date(getTimeStamp * 1000);
    return timestamp;
  }

  /**
   * Gets the current hostname and replaces 'localhost' to a defualt or use the
   * browser current url.
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
   * Update validation state
   * @param name
   * @param valid
   */
  setValidity(name, valid) {
    if (name && valid) {
      this.setState((prevState) => {
        let newState;
        if (prevState.validation[name] !== undefined &&
          (prevState.validation[name].value === undefined || prevState.validation[name].value !== valid.value)) {
          newState = {
            ...this.state,
            validation: {
              ...this.state.validation,
              [name]: valid,
            },
          };
        }
        return newState;
      });
    }
  }


  /**
   * Map the input field properties to a new array containing the input field instances
   * @returns {Array}
   */
  createInputFields() {
    const inputFields = [];
    Object.entries(this.state.inputFieldProps).map(([field, props]) => inputFields.push(<InputField
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
    // required settings to post to api endpoint
    const settings = {
      campaign: CAMPAIGN,
      transSource: TRANS_SOURCE,
      transSourceUrl: this.getCurrentUrl(),
      transType: 'prefs',
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
      .then((response) => {
        this.setState({
          formDataSuccess: response.data.message,
        });
        this.props.history.push({
          pathname: '/success',
          state: { firstname: formValues.firstname },
        });
      })
      .catch((error) => {
        this.setState({
          formDataError: error,
        });
      });
  }

  /**
   * Checks if any field is invalid.
   * If invalid fields: shows error sets state to show errorMessages.
   * If all fields valid: calls submitForm.
   * @param e
   */
  validateForm(e) {
    e.preventDefault();
    // check if there are any invalid fields
    const fields = [];
    Object.keys(this.state.validation).map(key =>
      fields.push(this.state.validation[key].valid));
    const invalidFields = fields.some(element => element === false);
    // update state accordingly
    if (invalidFields === false) {
      this.setState({
        ...this.state,
        formValidity: true,
      });
      this.submitForm();
    }
    if (invalidFields === true) {
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
          <strong>Name, email and billing address: </strong>
          we need it to create a receipt for your payment and send it to you.
        </p>
        <p>
          <strong>Phone number:</strong> we collect it in case there is an issue
          with gift aid donation.
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
          Gift aid your donation and the <strong>Government will give us 25%</strong> on top of it.
        </h2>
      </div>
    );
  }


  render() {
    const { formDataSuccess, formDataError } = this.state;
    return (
      <main role="main">
        <section>
          <form id="form" noValidate className="giftaid__form" method="post" data-success={formDataSuccess} data-error={formDataError}>
            {this.renderFormHeader()}
            { this.createInputFields() }
            <PostcodeLookup label="Postal address" showErrorMessages={this.state.showErrorMessages} isAddressValid={(validation) => { Object.keys(validation).map(key => this.setValidity(key, validation[key])); }} />
            <button type="submit" className="btn btn--red" onClick={e => this.validateForm(e)}>Gift Aid your donation</button>
            {this.renderJustInTimeMessage()}
          </form>
        </section>
      </main>
    );
  }
}

GiftAidForm.defaultProps = {
  inputFieldOverrides: {},
  history: { push: { } },
};

GiftAidForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
  history: propTypes.shape({
    push: propTypes.func,
  }),
};

export default GiftAidForm;
