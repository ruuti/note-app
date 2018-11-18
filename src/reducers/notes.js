import { NOTES } from '../constants';

const initialState = { 
  notesLoaded : false, 
  notes: []
};

/**
 * Notes reducer
 * @param  {object} state  current state
 * @param  {object} action action object to execute
 * @return {object}        State
 */
const notes = (state = initialState, action) => {
  switch (action.type) {
    case NOTES.GET_NOTES:
      return {
        ...state,
        notesLoaded: true, 
        notes: action.notes
      };
    default:
      return state
  }
}

export default notes;