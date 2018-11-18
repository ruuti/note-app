import React from 'react';
import { IconButton } from '../';

const CategoryRow = ({onClick, onDoubleClick, category, onClickDelete}) => (
  <div className={'category-row'}>
    
    <span onClick={onClick} onDoubleClick={onDoubleClick}>
      { category.title }
    </span>
    
    { !category.isDefault &&
      <IconButton 
        iconClass={'glyphicon-trash'}
        onClick={onClickDelete} />
    }
  </div>
)

export default CategoryRow;