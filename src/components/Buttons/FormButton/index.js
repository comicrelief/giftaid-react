import React from 'react';

const Button = (props) => {

  return (
    <button
      type="submit"
      className="btn btn--red"
      onClick={e => props.onClick(e)}
      disabled={props.isSubmitting}
    >
      { props.text }
    </button>
  );
};

export default Button;
