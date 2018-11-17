import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NoteListItems, SearchBar } from '../../components';

import { setSearch } from '../../actions';

import Fuse from "fuse.js";

class NoteList extends Component {

  constructor(props) {
    super(props);

    const { query, notes, selectedCategory } = props;
    this.state = { 
      query,
      searchHits: props.notes,
      notes, selectedCategory
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // Update state when props change if needed.
  componentWillReceiveProps({notes, selectedCategory, query}) {
    if (this.state.notes !== notes)
      this.setState({notes},() => {
        this.filterNotes();
      });

    if (this.state.selectedCategory !== selectedCategory)
      this.setState({selectedCategory},() => {
        this.filterNotes();
      });

    if (this.state.query !== query)
      this.setState({query},() => {
        this.filterNotes();
      });
  }

  search(e) {
    const fuse = new Fuse(e, {
      keys: ['text']
    });
    return fuse.search(this.state.query);
  }

  // Handle search input change when onChange gets
  // triggered
  handleChange({target}) {
    this.props.setSearch(target.value);
  }

  filterNotes(){
    const { query, notes, selectedCategory } = this.state;
    let searchHits = query.length ? this.search(notes) : notes;

    // Filter notes by possible active category
    if(selectedCategory)
      searchHits = searchHits.filter((note) => 
        note.categoryUid === selectedCategory
      );
    this.setState({searchHits});
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

const mapDispatch = dispatch => ({
  setSearch: query => {
    dispatch(setSearch(query))
  }
})

const mapState = ({notes, categories, search}) => ({
  notes: notes.notes,
  selectedCategory: categories.selectedCategory,
  query: search.query
})

export default connect(mapState, mapDispatch)(NoteList);