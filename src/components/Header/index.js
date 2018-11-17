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

  handleClick() {
    const { selectedCategory } = this.props;
    addNote(selectedCategory).then(id => {
      // Open created empty note
      this.props.history.push('/'+id);
      // Clear search for better UX
      this.props.setSearch('');
    });
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

const mapDispatch = dispatch => {
  return {
    setSearch: query => {
      dispatch(setSearch(query))
    }
  }
}

const mapState = state => ({
  selectedCategory: state.categories.selectedCategory
})

export default connect(mapState, mapDispatch)(withRouter(Header));