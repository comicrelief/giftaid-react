import React from 'react';

const Logo = (props) => {

  return (
    <a href={props.href} className={props.className} title={props.title} rel={props.rel}>
      <img src={props.logo} alt={props.alt} />
    </a>
  );
};

export default Logo;
