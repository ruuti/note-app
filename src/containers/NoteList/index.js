import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NoteListItems, SearchBar } from '../../components/';

import { setSearch } from '../../actions';

import Fuse from "fuse.js";

class NoteList extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      query : props.query,
      searchHits: props.notes,
      notes: props.notes,
      selectedCategory: props.selectedCategory
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // Update state when props change if needed.
  componentWillReceiveProps({notes, selectedCategory, query}) {
    if (this.state.notes !== notes) {
      this.setState({notes},() => {
        this.filterNotes();
      });
    }
    if (this.state.selectedCategory !== selectedCategory) {
      this.setState({selectedCategory},() => {
        this.filterNotes();
      });
    }
    if (this.state.query !== query) {
      this.setState({query},() => {
        this.filterNotes();
      });
    }
  }

  search(e) {
    var opts = {
      keys: ['text']
    };
    var fuse = new Fuse(e, opts);
    var res = fuse.search(this.state.query);
    return res;
  }

  // Handle search input change when onChange gets
  // triggered
  handleChange(event) {
    this.props.setSearch(event.target.value);
  }

  filterNotes(){
    const { query, notes, selectedCategory } = this.state;
    let hitsArray = [];

    if(query.length){
      hitsArray = this.search(notes);
    }else{
      // User is not searching anything
      hitsArray = notes;
    }

    // Filter notes by possible active category
    if(selectedCategory){
      hitsArray = hitsArray.filter((note) => 
        note.categoryUid === selectedCategory
      );
    }

    this.setState({
      searchHits: hitsArray
    });
  }

  render() {
    return (
      <div>
        <SearchBar 
          inputValue={this.state.query} 
          onChange={this.handleChange} />
        <NoteListItems notes={this.state.searchHits} />        
      </div>
    );
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
  notes: state.notes.notes,
  selectedCategory: state.categories.selectedCategory,
  query: state.search.query
})

export default connect(mapState, mapDispatch)(NoteList);