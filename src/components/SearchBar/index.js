import React from 'react';
import { IconButton } from '../';

const SearchBar = ({inputValue, onChange}) => (
  <div className={'searchBar'}>
    <div className={'input-group'}>
      <span className={'input-group-btn'}>
        <IconButton 
          buttonClass={'btn'} 
          iconClass={'glyphicon-search'} />
      </span>
      <input 
        type={'text'}
        className={'form-control'}
        placeholder={'Search for notes...'}
        value={inputValue} 
        onChange={onChange} />
    </div>
  </div>
);

export default SearchBar;