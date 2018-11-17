import React, { Component } from 'react'
import CategoryListItem from './CategoryListItem';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

class CategoryListItems extends Component {
  
  render() {
    const { selectedCategory } = this.props;

    return (
      <ListGroup>
        {this.props.categories.map((category) => (
          <CategoryListItem 
            key={category.id} 
            category={category} 
            active={selectedCategory===category.id} />
        ))}
      </ListGroup>
    );
  }
}

const mapState = state => ({
  selectedCategory: state.categories.selectedCategory
})

export default connect(mapState, null)(CategoryListItems);