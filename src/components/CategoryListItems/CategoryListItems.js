import React, { Component } from 'react'
import CategoryListItem from './CategoryListItem';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

class CategoryListItems extends Component {
  render() {

  	const { selectedCategory } = this.props;
    const defaultCategory = {
      id : null,
      title : 'Default',
      isDefault : true
    }
  	
  	return (
      <ListGroup>
        <CategoryListItem 
            key={null} 
            category={defaultCategory} 
            active={(selectedCategory === null)} />
		    {this.props.categories.map((category) => (
		      <CategoryListItem 
		      	key={category.id} 
		      	category={category} 
		      	active={(selectedCategory && selectedCategory===category.id)} />
		    ))}
		  </ListGroup>
    );
  }
}

const mapState = state => ({
  selectedCategory: state.categories.selectedCategory
})
export default connect(mapState, null)(CategoryListItems);