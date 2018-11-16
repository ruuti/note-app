import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryListItems from '../../components/CategoryListItems/CategoryListItems';

import { addCategory }  from '../../firebase';
import { selectCategory } from '../../actions';

import { Button, Modal } from 'react-bootstrap';

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

  // Handle textarea change when onChange gets
  // triggered
  handleChange(event) {
    this.setState({category: event.target.value});
  }

  render() {
    return (
      <div>
        <div className={'categoryHeader'}>
          <div>
            <span className="strong">Folders</span>
          </div>
          <button type="button" className={'iconBtn'} onClick={this.handleClick}>
            <i className={'glyphicon glyphicon-plus-sign'}></i>
          </button>
        </div>
        <CategoryListItems categories={this.props.categories} />
        
        <Modal
          show={this.state.showModal}
          onHide={this.handleHideModal}
          keyboard={true}
          animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Create folder</Modal.Title>
            </Modal.Header>
            
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>              
                <input
                  type="text"
                  value={this.state.text} 
                  onChange={this.handleChange}
                  required={true}
                  autoFocus
                  placeholder={'Folder name'}
                  className={'form-control'} />
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this.handleHideModal}>Cancel</Button>
                <Button bsStyle="primary" type="submit">Create folder</Button>
              </Modal.Footer>
            </form>
        </Modal>

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