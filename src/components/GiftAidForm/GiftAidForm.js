/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup/PostcodeLookup';
import defaultInputFieldsData from './defaultGiftaidFields.json';
import './GiftAidForm.scss';


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
    };
  }

  componentWillMount() {
    this.setState({
      inputFieldProps: this.mergeInputFieldProps(defaultInputFieldsData),
    });
  }

  componentDidMount() {
    if (this.state.firstUpdate === false) {
      this.setValidity();
    }
  }

  setValidity(name, valid) {
    console.log('val', this.state.firstUpdate, name, valid, this.state.validation);
    if (name === undefined) {
      this.setState({
        ...this.state,
        firstUpdate: true,
      });
    } else if (this.state.firstUpdate === true && valid !== undefined) {
      console.log('valid', valid);
    } else if (name !== undefined && this.state.firstUpdate === true &&
      ((this.state.validation === undefined || (this.state.validation !== undefined && (this.state.validation[name].value !== valid.value)) ||
      (this.state.validation[name].message !== valid.message)))) {
      this.setState({
        ...this.state,
        validation: {
          ...this.state.validation,
          [name]: {
            valid: valid.valid,
            value: valid.value,
            message: valid.message,
          },
        },
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
    this.setValidity();
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
        <InputField id="firstname1" type="text" name="firstname1" label="firstname1" isValid={(valid, name) => this.setValidity(name, valid)} />
        <PostcodeLookup label="Postal address" isAddressValid={(validation) => { Object.keys(validation).map(key => this.setValidity(key, validation[key])); }} />
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
