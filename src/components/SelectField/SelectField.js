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
    };
    this.validateField = this.validateField.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e) {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
    console.log(this.state.value);
  }

  getSelectedOption() {
    const selected = this.props.options.find(item => item.selected === true);
    return selected.value;
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
  validateField(e) {
    // const index = e.target.selectedIndex;
    // let value = e.target.options[index].getAttribute('value');
    let value = e.target.value;
    value = value && value.toLowerCase();
    if (this.props.required === true && (!value || value === 'please select')) {
      this.setState({
        valid: false,
        message: 'This field is required',
      });
    } else if (this.props.required === true && (value || value !== 'please select')) {
      this.setState({
        valid: true,
        message: '',
      });
    }
    console.log('value', e.target.value);
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
          defaultValue={this.getSelectedOption()}
          aria-describedby={`field-label--${this.props.id} field-error--${this.props.id}`}
          onBlur={this.validateField}
          onChange={this.onChangeHandler}
        >
          { this.createOptions() }
        </select>
        { this.state.valid === false &&
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
