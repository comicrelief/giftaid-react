/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';


class Form extends Component {
  render() {
    return (
      <form id="form">
        <InputField
          field={this.props.field}
        />
      </form>
    );
  }
}

Form.propTypes = {
  field: propTypes.shape.isRequired,
};

export default Form;
