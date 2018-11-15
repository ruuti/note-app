import reducer from '../reducers';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { notesRef, categoryRef } from '../firebaseRefs';
import { getNotes, getCategories } from '../actions';

export const Store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

export function getNotesThunk() {
  return dispatch => {
    notesRef.orderByChild('editedAt').on('value', snap => {
      const notes = [];
      snap.forEach(data => {
        let note = data.val();
        note.id = data.key;
        notes.push(note)
      });
      notes.reverse();
      dispatch(getNotes(notes))
    });
  }
}

export function getCategoriesThunk(category) {
  return dispatch => {
    categoryRef.on('value', snap => {
      const categories = [];
      snap.forEach(data => {
        let category = data.val();
        category.id = data.key;
        categories.push(category)
      })
      dispatch(getCategories(categories))
    });
  }
}