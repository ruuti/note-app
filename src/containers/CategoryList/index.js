import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CategoryListItems, 
  CategoryListHeader,
  CategoryCreationModal } from '../../components';

import { addCategory }  from '../../firebase';
import { selectCategory } from '../../actions';
import { CATEGORY_LENGTH } from '../../constants';

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

  /**
   * Handle new folder form submission
   * @param  {event} e
   */
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
  
  /**
   * Hides modal window when user clicks outside
   * of the open modal window or presses close -button
   */
  handleHideModal() {
    this.setState({ showModal: false });
  }
  
  /**
   * Resets modal window input (state: category)
   * and opens folder creation modal window.
   */
  handleClick() {
    this.setState({ 
      category: '',
      showModal: true
    });
  }

  /**
   * Handle input change by updating state when 
   * folder creation input onChange gets tiggered
   * @param  {event} event
   */
  handleChange({target}) {
    this.setState({category: target.value});
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
          maxLength={CATEGORY_LENGTH}
          onClick={this.handleHideModal} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  selectCategory: uid => {
    dispatch(selectCategory(uid))
  }
})

const mapState = state => ({
  categories: state.categories.categories
})

export default connect(mapState, mapDispatch)(CategoryList);