/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';


class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: null,
      message: '',
      value: this.getSelectedOption(),
      showErrorMessage: this.props.showErrorMessage,
    };
    this.setRef = (element) => {
      this.inputRef = element;
    };
    this.validateField = this.validateField.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  /**
   * Validate initial state
   * (will trigger an update through the validateField function)
   */
  componentDidMount() {
    this.validateField();
  }

  /**
   * When component has updated send state to parent
   */
  componentDidUpdate() {
    this.sendStateToParent();
  }

  /**
   * Handle the onChange and onBlur events
   * @param e
   */
  onChangeHandler(e) {
    const value = e.target.value;
    this.setState({
      value,
      showErrorMessage: true,
    });
    this.validateField(e);
  }

  /**
   * Get the default option, marked as selected from the props.options array
   * Returns the value or undefined
   */
  getSelectedOption() {
    let selected = this.props.options.find(item => item.selected === true);
    if (selected !== undefined) {
      selected = selected.value;
    }
    return selected;
  }

  /**
   * Uses isValid callback function sending state, value and field name to parent
   */
  sendStateToParent() {
    if (typeof this.props.isValid === 'function') {
      this.props.isValid(this.state, this.state.value, this.props.name);
    }
  }

  /**
   * Create array with option tags from props.options
   * @returns {Array}
   */
  createOptions() {
    const options = [];
    this.props.options.map(item =>
      options.push(<option
        key={item.label}
        value={item.value}
        disabled={item.disabled}
      >{item.label}</option>));
    return options;
  }

  /**
   * Validate the select field and update the state with validation info
   * @param e
   */
  validateField(e) {
    let value = e ? e.target.value : this.inputRef.value;
    value = value && value.toLowerCase();
    if (this.props.required === true && (!value || value === 'please select')) {
      this.setState({
        valid: false,
        message: 'This field is required',
        value,
      });
    } else if (this.props.required === true && (value || value !== 'please select')) {
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    } else {
      this.setState({
        valid: true,
        message: '',
        value,
        showErrorMessage: false,
      });
    }
  }

  render() {
    const errorClass = this.state.showErrorMessage === true && 'form__field-error-wrapper';
    const extraClass = this.props.extraClass !== '' && this.props.extraClass;
    return (
      <div id={`field-wrapper--${this.props.id}`} className={`form__fieldset form__field--wrapper form__field-wrapper--select ${errorClass} ${extraClass}`}>
        <label id={`field-label--${this.props.id}`} htmlFor={`field-select--${this.props.id}`} className={`form__field-label ${this.props.required ? ' required' : ''}`}>
          {this.props.label}
          {!this.props.required &&
          <span>&nbsp;(Optional)&nbsp;</span>
          }
        </label>
        <select
          id={`field-select--${this.props.id}`}
          name={this.props.name && this.props.name}
          defaultValue={this.getSelectedOption()}
          aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
          onBlur={this.onChangeHandler}
          onChange={this.onChangeHandler}
          ref={this.setRef}
        >
          { this.createOptions() }
        </select>
        { (this.state.valid === false && this.state.showErrorMessage === true && this.state.message !== '') &&
        <div
          id={`field-error--${this.props.id}`}
          className="form__field-error-container form__field-error-container--select"
          aria-live="assertive"
          role="status"
        >
          <span className="form-error">
            {this.state.message}
          </span>
        </div>
        }
      </div>
    );
  }
}

SelectField.defaultProps = {
  extraClass: '',
  isValid: () => {},
  showErrorMessage: false,
};

SelectField.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
  options: propTypes.arrayOf(propTypes.shape({
    label: propTypes.string,
    value: propTypes.string,
    selected: propTypes.bool,
    disabled: propTypes.bool,
  }).isRequired).isRequired,
  extraClass: propTypes.string,
  isValid: propTypes.func,
  showErrorMessage: propTypes.bool,
};

export default SelectField;
