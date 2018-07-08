/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup/PostcodeLookup';
import defaultInputFieldsData from './defaultGiftaidFields.json';


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
      validation: {
        confirm: {
          valid: null,
          value: undefined,
          message: '',
        },
        mobile: {
          valid: null,
          value: undefined,
          message: '',
        },
        firstname: {
          valid: null,
          value: undefined,
          message: '',
        },
        lastname: {
          valid: null,
          value: undefined,
          message: '',
        },
        postcode: {
          valid: null,
          value: undefined,
          message: '',
        },
        address1: {
          valid: null,
          value: undefined,
          message: '',
        },
        address2: {
          valid: null,
          value: undefined,
          message: '',
        },
        address3: {
          valid: null,
          value: undefined,
          message: '',
        },
        town: {
          valid: null,
          value: undefined,
          message: '',
        },
        country: {
          valid: null,
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

  validateForm(e) {
    e.preventDefault();
    if (this.state.formValidity === false) {
      this.setState({
        ...this.state,
        showErrorMessages: true,
      });
    }
    console.log('submit', this.state.validation);
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
    return (
      <form id="form" noValidate className="giftaid__form">
        {this.renderFormHeader()}
        { this.createInputFields() }
        <PostcodeLookup label="Postal address" showErrorMessages={this.state.showErrorMessages} isAddressValid={(validation) => { Object.keys(validation).map(key => this.setValidity(key, validation[key])); }} />
        <button type="submit" className="btn btn--red" onClick={e => this.validateForm(e)}>Gift Aid your donation</button>
        {this.renderJustInTimeMessage()}
      </form>
    );
  }
}

GiftAidForm.defaultProps = {
  inputFieldOverrides: {},
};

GiftAidForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
};

export default GiftAidForm;
