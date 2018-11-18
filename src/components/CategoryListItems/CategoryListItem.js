import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectCategory } from '../../actions';
import { removeCategory, editCategory }  from '../../firebase';
import CategoryDropTarget from './CategoryDropTarget';
import InlineEditForm from './InlineEditForm';
import CategoryRow from './CategoryRow';
import { CATEGORY_LENGTH } from '../../constants';

class CategoryListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = { showEdit: false, title: props.category.title };
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentWillUnmount() {
    this.closeInlineEdit();
  }

  // Update category title if changes
  componentWillReceiveProps({category}) {
    if (this.state.title !== category.title)
      this.setState({title:category.title});
  }

  // Link ref
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // Set clicked category active
  handleClick() {
    const { id } = this.props.category;
    this.props.selectCategory(id);
  }

  // Delete category
  handleDeleteClick() {
    const { id } = this.props.category;
    removeCategory(id).then(() =>
      // Set active category to default
      this.props.selectCategory(null));
  }

  // Open inline edit mode when user double clicks row
  // if not default category or already open
  handleDoubleClick(e) {
    e.preventDefault();
    
    const {category} = this.props;
    if(category.isDefault || this.state.showEdit) return;

    this.setState({ showEdit: true, title: category.title });

    // Start listening events for closing inline edit mode
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  // Save new category title to database when user 
  // presses enter (submits form)
  handleSubmit(e) {
    e.preventDefault();
    this.saveCategoryName();
    this.closeInlineEdit();
  }

  // Handle edit input change when onChange gets
  // triggered
  handleChange({target}) {
    this.setState({ title: target.value });
  }

  // Close edit mode (if open) when user presses esc
  handleKeyDown({keyCode}) {
    if(keyCode === 27)
      this.closeInlineEdit();
  }

  // Close edit mode (if open) when user clicks outside
  // of the component
  handleClickOutside({target}) {
    if (this.wrapperRef && !this.wrapperRef.contains(target))
      this.closeInlineEdit();
  }

  // Closes inline edit mode and removes listeners
  closeInlineEdit() {
    if(!this.state.showEdit) return;
    this.setState({ showEdit: false });
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Save new category title to database
  saveCategoryName() {
    const { title } = this.state;
    const { id } = this.props.category;
    editCategory(id, title);
  }
  
  render() {
    const { category, active } = this.props;
    const { showEdit, title } = this.state;

    return (
      <CategoryDropTarget category={category}>
        <div ref={this.setWrapperRef}>
          <ListGroupItem className={ active && 'active' }>
            
            { !showEdit ? (
              <CategoryRow 
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                category={category}
                onClickDelete={this.handleDeleteClick} />
            ) : (
              <InlineEditForm 
                onSubmit={this.handleSubmit} 
                onChange={this.handleChange}
                maxLength={CATEGORY_LENGTH}
                value={title} />
            )}

          </ListGroupItem>
        </div>
      </CategoryDropTarget>
    );
  }
}

const mapDispatch = dispatch => ({
  selectCategory: uid => {
    dispatch(selectCategory(uid))
  }
})

export default connect(null, mapDispatch)(CategoryListItem);