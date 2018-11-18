import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NoteListItems, SearchBar, NoSearchHits } from '../../components';
import { setSearch } from '../../actions';
import Fuse from "fuse.js";

class NoteList extends Component {

  constructor(props) {
    super(props);
    this.state = { searchHits: props.notes };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Update state when props change if needed.
   * @param  {object} prevProps
   */
  componentDidUpdate({notes, selectedCategory, query}) {
    if (this.props.notes !== notes)
      this.filterNotes();
    if (this.props.selectedCategory !== selectedCategory)
      this.filterNotes();
    if (this.props.query !== query)
      this.filterNotes();
  }

  /**
   * Search from notes with Fuse
   * @param  {array} notes All notes to search from
   * @return {array}       Search results
   */
  search(notes) {
    const fuse = new Fuse(notes, {
      keys: ['text']
    });
    return fuse.search(this.props.query);
  }

  /**
   * Handle search input change when onChange gets
   * triggered
   * @param  {event} event
   */
  handleChange({target}) {
    this.props.setSearch(target.value);
  }

  /**
   * Filter notes from all available notes by selected
   * category and search query
   */
  filterNotes(){
    const { query, notes, selectedCategory } = this.props;
    let searchHits = query.length ? this.search(notes) : notes;

    // Filter notes by possible active category
    if(selectedCategory)
      searchHits = searchHits.filter((note) => 
        note.categoryUid === selectedCategory
      );
    this.setState({searchHits});
  }

  /**
   * Return text for search input placeholder from selected
   * category
   * @param  {string} selectedCategory Currently selected category id
   * @return {string}                  Placeholder text
   */
  getPlaceholder(selectedCategory){
    let placeholder = 'Search for all notes..';
    if(selectedCategory)
      placeholder = 'Search for notes in folder..';
    return placeholder;
  }

  render() {
    const { searchHits } = this.state;
    const { query, selectedCategory } = this.props;
    const noSearchHits = !searchHits.length && query.length;
    const placeholder = this.getPlaceholder(selectedCategory);

    return (
      <div>
        <SearchBar 
          inputValue={query}
          placeholder={placeholder}
          onChange={this.handleChange} />
        <NoteListItems notes={searchHits} />
        { noSearchHits &&
          <NoSearchHits query={query} />
        }    
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