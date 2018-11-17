import reducer from '../reducers';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { notesRef, categoryRef } from '../firebaseRefs';
import { getNotes, getCategories } from '../actions';

import { objectsToArray } from '../utils';

export const Store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

export function getNotesThunk() {
  return dispatch => {
    notesRef.orderByChild('editedAt').on('value', snap => {
      const notes = objectsToArray(snap);
      notes.reverse();
      dispatch(getNotes(notes))
    });
  }
}

export function getCategoriesThunk(category) {
  return dispatch => {
    categoryRef.on('value', snap => {
      const categories = objectsToArray(snap);
      dispatch(getCategories(categories))
    });
  }
}