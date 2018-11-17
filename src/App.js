import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { getNotesThunk, getCategoriesThunk } from './store';
import { connect } from 'react-redux';

import { Layout } from './containers';
import { Loading } from './components';

class App extends Component {

  render() {
    const { isLoaded } = this.props;
    const content = isLoaded ? <Layout /> : <Loading />;

    return (
      <div className={'App'}>
        <Router>
          { content }
        </Router>
      </div>
    );
  }
}

const mapState = state => ({
  isLoaded: (state.notes.notesLoaded && state.categories.categoriesLoaded)
})

const mapDispatch = dispatch => {
  dispatch(getNotesThunk());
  dispatch(getCategoriesThunk());
  return {}
}
export default connect(mapState, mapDispatch)(App);
