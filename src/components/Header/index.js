import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { addNote }  from '../../firebase';
import { setSearch } from '../../actions';

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
      <div>
        <button className={'btn'} onClick={this.handleClick}>
          <i className={'glyphicon glyphicon-edit'}></i> New note
        </button>
      </div>
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