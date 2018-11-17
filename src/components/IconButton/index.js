import React from 'react';

const IconButton = ({onClick, iconClass, buttonClass, text}) => (
  <button type="button" className={buttonClass} onClick={onClick}>
    <i className={`glyphicon ${iconClass}`}></i> { text }
  </button>
);

IconButton.defaultProps = {
  buttonClass: 'icon-only-button'
};

export default IconButton;