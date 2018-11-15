import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { getNotesThunk, getCategoriesThunk } from './store';
import { connect } from 'react-redux';

import { Layout } from './containers';
import './App.css';

class App extends Component {

  render() {
    const { loaded } = this.props;
    
    return (
      <div className="App">
        <Router>
          { loaded ? (
            <Layout />
          ) : (
            <p>Loading</p>
          ) }
        </Router>
      </div>
    );
  }
}

const mapState = state => ({
  loaded: (state.notes.notesLoaded && state.categories.categoriesLoaded)
})

const mapDispatch = dispatch => {
  dispatch(getNotesThunk());
  dispatch(getCategoriesThunk());
  return {}
}
export default connect(mapState, mapDispatch)(App);
