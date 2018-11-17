import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CategoryListItems, 
  CategoryListHeader,
  CategoryCreationModal } from '../../components';

import { addCategory }  from '../../firebase';
import { selectCategory } from '../../actions';

class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      category: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { category } = this.state;
    // We want to close modal immediately and not
    // after succesfull saving to make flow faster.  
    this.setState({ showModal: false });
    addCategory(category).then((id) => {
      this.props.selectCategory(id);
    });
  }
  handleHideModal() {
    this.setState({ showModal: false });
  }
  
  handleClick() {
    this.setState({ 
      category: '',
      showModal: true
    });
  }

  // Handle input change when onChange gets
  // triggered
  handleChange(event) {
    this.setState({category: event.target.value});
  }

  render() {
    return (
      <div>
        <CategoryListHeader onClick={this.handleClick} />
        <CategoryListItems categories={this.props.categories} />
        <CategoryCreationModal
          show={this.state.showModal}
          onHide={this.handleHideModal}
          onSubmit={this.handleSubmit}
          inputValue={this.state.text}
          onChange={this.handleChange}
          onClick={this.handleHideModal} />
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