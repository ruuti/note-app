import React from 'react';
import { IconButton } from '../';

const CategoryListHeader = ({onClick}) => (
  <div className={'categoryHeader'}>
    <div>
      <span className={'strong'}>Folders</span>
    </div>
    <IconButton 
      iconClass={'glyphicon-plus-sign'}
      onClick={onClick} />
  </div>
);

export default CategoryListHeader;