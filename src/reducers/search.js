import { SEARCH } from '../constants';

const initialState = { 
  query : ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH.SET_SEARCH:
      return {
        query: action.query
      };
    default:
      return state
  }
}

export default search;