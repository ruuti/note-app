import React from 'react';

const DateRow = ({text}) => (
  <span className={'date'}>
    <i className={'glyphicon glyphicon-time'}></i> { text }
  </span>
);

export default DateRow;