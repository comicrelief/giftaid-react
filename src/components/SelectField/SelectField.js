/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';


class SelectField extends Component {
  createOptions() {
    const options = [];
    this.props.options.map(item =>
      options.push(<option
        key={item.label}
        value={item.value}
        selected={item.selected}
        disabled={item.disabled}
      >{item.label}</option>));
    return options;
  }
  render() {
    return (
      <div id={`field-wrapper--${this.props.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--select ${this.props.extraClass ? this.props.extraClass : ''}`}>
        <label id={`field-label--${this.props.id}`} htmlFor={`field-input--${this.props.id}`} className={`form__field-label${this.props.required ? ' required' : ''}`}>
          {this.props.label}
          {!this.props.required &&
          <span>&nbsp;(Optional)&nbsp;</span>
          }
        </label>
        <select
          id={`field-select--${this.props.id}`}
          name={this.props.name && this.props.name}
          aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
        >
          { this.createOptions() }
        </select>
        <div
          id={`field-error--${this.props.id}`}
          className="form__field-error-container form__field-error-container--select"
          aria-live="assertive"
          role="status"
        >
          <span className="form-error" />
        </div>
      </div>
    );
  }
}

SelectField.defaultProps = {
  extraClass: '',
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

};

export default SelectField;
