/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';


class Form extends Component {
  render() {
    return (
      <form id="form">
        //iterate throught fields array and render an input field with its props for each field we need
        // this won't be great for forms like donate though so rethink this...
        <InputField
          field={this.props.field}
        />
      </form>
    );
  }
}

Form.propTypes = {
  fields: propTypes.shape.isRequired,
};

export default Form;
