import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryListItems from '../../components/CategoryListItems/CategoryListItems';

import { addCategory }  from '../../firebase';
import { selectCategory } from '../../actions';

class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
	handleClick() {
    var categoryName = prompt("Please enter name");
    if (categoryName && categoryName.length) {
      addCategory(categoryName).then((id) => {
        this.props.selectCategory(id);
      });
    }
  }

  render() {
    return (
      <div>
        <p>Categories</p>
        <CategoryListItems categories={this.props.categories} />
        <button type="button" onClick={this.handleClick}>New folder</button>
      </div>
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

const mapState = state => ({
  categories: state.categories.categories
})

export default connect(mapState, mapDispatch)(CategoryList);