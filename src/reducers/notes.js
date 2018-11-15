import { NOTES } from '../constants';

const initialState = { 
  notesLoaded : false, 
  notes: []
};

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