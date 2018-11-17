import React, { Component } from 'react';
import { getNotesThunk, getCategoriesThunk } from './store';
import { connect } from 'react-redux';

import { Layout } from './containers';
import { Loading, AppContainer } from './components';

class App extends Component {

  render() {
    const { isLoaded } = this.props;
    const contentToRender = isLoaded ? <Layout /> : <Loading />;

    return (
      <AppContainer>
        { contentToRender }
      </AppContainer>
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
