import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectCategory } from '../../actions';
import { removeCategory }  from '../../firebase';
import { IconButton } from '../';

class CategoryListItem extends Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleClick(){
    const { id } = this.props.category;
    this.props.selectCategory(id);
  }

  handleDeleteClick(){
    const { id } = this.props.category;
    removeCategory(id).then(() => {
      // Set active category to default
      this.props.selectCategory(null);
    });
  }
  
  render() {
    const { category, active } = this.props;
    return (
      <ListGroupItem className={ active ? 'active' : '' }>
        <span 
          onClick={this.handleClick}>
            { category.title }
        </span>
        { !category.isDefault &&
          <IconButton 
            buttonClass={'delete'}
            iconClass={'glyphicon-trash'}
            onClick={this.handleDeleteClick} />
        }
      </ListGroupItem>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    selectCategory: uid => {
      dispatch(selectCategory(uid))
    }
  }
}
export default connect(null, mapDispatch)(CategoryListItem);