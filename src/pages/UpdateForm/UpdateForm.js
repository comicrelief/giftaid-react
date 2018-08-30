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
 * Input field properties can be overridden by passing in a inputFieldOverrides object with the
 * same structure as the defaultInputFieldProps object, e.g.:
 * inputFieldOverrides = {
 *   firstName: {
 *     label: 'some text',
 *   },
 * }
 */
class UpdateForm extends Component {
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
      },
      radioButtonOptions: [
        {
          label: 'Yes, I would like Comic Relief to claim Gift Aid on my donation',
          additionalText: '``* By ticking I state I am a UK taxpayer making a personal donation and understand' +
          'that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my ' +
          'donations, it is my responsibility to pay any difference. [Find out more](http://www.comicrelief.com)',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
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
        // console.log('this.fieldRefs', this.fieldRefs);
      }
    };
  }

  /**
   * Merges any overrides to the default input field data json with it
   */
  componentWillMount() {
    this.setState({
      inputFieldProps: this.mergeInputFieldProps(defaultInputFieldsData),
    });
  }

  /**
   * Deals with component update after pressing submit button
   */
  componentDidUpdate() {
    console.log('* component did update');
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
  setValidity(name, valid) {
    console.log('setValidity');
    if (name && valid) {
      this.setState((prevState) => {
        let newState;
        if (prevState.validation[name] !== undefined &&
          (prevState.validation[name].value === undefined ||
            prevState.validation[name].value !== valid.value)) {
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
      if (this.fieldRefs[i].labels !== undefined) {
        const classes = this.fieldRefs[i].labels[0].getAttribute('class');
        if (classes.includes('error')) {
          item = this.fieldRefs[i];
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
    const inputFields = [];
    // console.log('this.state.inputFieldProps', this.state.inputFieldProps);
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
          pathname: '/success',
          state: { firstname: formValues.firstname },
        });
      })
      .catch(() => {
        this.props.history.push({
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
    // here
    console.log('validateForm');
    e.preventDefault();
    // Put field validation into new array to check for invalid fields
    const fields = [];
    Object.keys(this.state.validation).map(key =>
      fields.push(this.state.validation[key].valid));
    // values can be null or empty strings so check for not true
    const invalidFields = fields.some(element => element !== true);
    // update state accordingly
    if (invalidFields === false) {
      this.setState({
        ...this.state,
        formValidity: true,
      });
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
          Edit your Gift Aid declaration
        </h2>
        <p className="text-align-centre">
          We can claim Gift Aid from personal donations made by UK taxpayers:
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
    const { formDataSuccess, formDataError } = this.state;
    const required = true;
    return (
      <main role="main">
        <section>
          <form
            id="form"
            noValidate
            className="update-giftaid__form"
            data-success={formDataSuccess}
            data-error={formDataError}
          >
            {this.renderFormHeader()}
            <h3 className="form--update__title text-align-centre">
              Who is changing their declaration?
            </h3>
            <div className="form-fields--wrapper">

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

            </div>

            <h3 className="form--update__title text-align-centre">
                Your Gift Aid declaration
            </h3>

            <RadioButtons
              id="radioButtons1"
              name="radioButtons1"
              label="Can we claim Gift Aid on your donation?"
              required={required}
              options={this.state.radioButtonOptions}
              showErrorMessage={required}
              ref={this.setRef}
              isValid={(state, name, value) => { this.setValidity(state, name, value); }}
            />

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
  inputFieldOverrides: {},
  history: { push: { } },
};

UpdateForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
  history: propTypes.shape({
    push: propTypes.func,
  }),
};

export default UpdateForm;
