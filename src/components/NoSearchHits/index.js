import React from 'react';

const NoSearchHits = ({query}) => (
  <div className={'noSearchResults'}>
    <div>
      <div className={'icon'} />
      <p>Your search - <i>{query}</i> - did not match any notes.</p>
    </div>
  </div>
);

export default NoSearchHits;