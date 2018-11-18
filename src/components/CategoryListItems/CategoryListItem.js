import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectCategory } from '../../actions';
import { removeCategory, editCategory }  from '../../firebase';
import CategoryDropTarget from './CategoryDropTarget';
import InlineEditForm from './InlineEditForm';
import CategoryRow from './CategoryRow';
import { CATEGORY_LENGTH } from '../../constants';
import { ConfirmationModal } from '../';

class CategoryListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = { showEdit: false, title: props.category.title, showModal: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /**
   * Close inline edit when component unmounts.
   */
  componentWillUnmount() {
    this.closeInlineEdit();
  }

  /**
   * Update category title if changes.
   * TODO: Replace with componentDidUpdate
   * @param  {object} nextProps.category
   */
  componentWillReceiveProps({category}) {
    if (this.state.title !== category.title)
      this.setState({title:category.title});
  }

  /**
   * Link ref
   * @param {ref} node
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Set clicked category active
   */
  handleClick() {
    const { id } = this.props.category;
    this.props.selectCategory(id);
  }

  /**
   * Delete category and close confirmation modal
   * window
   */
  handleDeleteClick() {
    const { id } = this.props.category;
    this.handleCloseModal();
    removeCategory(id).then(() =>
      // Set active category to default
      this.props.selectCategory(null));
  }

  /**
   * Open inline edit mode when user double clicks row
   * if not default category or already open. Start 
   * listening events for closing inline edit mode
   * @param  {event} e
   */
  handleDoubleClick(e) {
    e.preventDefault();
    
    const {category} = this.props;
    if(category.isDefault || this.state.showEdit) return;

    this.setState({ showEdit: true, title: category.title });

    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Save new category title to database when user
   * presses enter (submits form)
   * @param  {event} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.saveCategoryName();
    this.closeInlineEdit();
  }

  /**
   * Handle edit input change when onChange gets
   * triggered
   * @param  {event} event.target
   */
  handleChange({target}) {
    this.setState({ title: target.value });
  }

  /**
   * Close edit mode (if open) when user presses esc
   * @param  {event} event.keyCode keydown event
   */
  handleKeyDown({keyCode}) {
    if(keyCode === 27)
      this.closeInlineEdit();
  }

  /**
   * Close edit mode (if open) when user clicks outside
   * of the component
   * @param  {event} event.target click event
   */
  handleClickOutside({target}) {
    if (this.wrapperRef && !this.wrapperRef.contains(target))
      this.closeInlineEdit();
  }

  /**
   * Closes inline edit mode and removes listeners
   */
  closeInlineEdit() {
    if(!this.state.showEdit) return;
    this.setState({ showEdit: false });
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Save new category title to database
   */
  saveCategoryName() {
    const { title } = this.state;
    const { id } = this.props.category;
    editCategory(id, title);
  }

  /**
   * Closes category deletion confirmation window
   */
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /**
   * Opens category deletion confirmation window
   */
  handleShowModal() {
    this.setState({ showModal: true });
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
                onClickDelete={this.handleShowModal} />
            ) : (
              <InlineEditForm 
                onSubmit={this.handleSubmit} 
                onChange={this.handleChange}
                maxLength={CATEGORY_LENGTH}
                value={title} />
            )}

          </ListGroupItem>
        </div>
        <ConfirmationModal 
          show={this.state.showModal} 
          onHide={this.handleCloseModal} 
          onPrimaryActionClick={this.handleDeleteClick}
          title={'Delete folder'}
          body={`Are you sure you want to permanently delete selected folder? 
            All existing notes in this folder will be moved to All notes`} />
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