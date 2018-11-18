import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { addNote }  from '../../firebase';
import { setSearch } from '../../actions';
import { IconButton } from '../';

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Creates a new note, opens the note and 
   * clears search query
   */
  handleClick() {
    const { selectedCategory } = this.props;
    this.props.setSearch('');
    addNote(selectedCategory).then(uid => 
      this.props.history.push('/'+uid));
  }

  render (){
    return (
      <IconButton 
        buttonClass={'btn'} 
        onClick={this.handleClick} 
        text={'New note'}
        iconClass={'glyphicon-edit'} />
    )
  }
}

const mapDispatch = dispatch => ({
  setSearch: query => {
    dispatch(setSearch(query))
  }
})

const mapState = state => ({
  selectedCategory: state.categories.selectedCategory
})

export default connect(mapState, mapDispatch)(withRouter(Header));