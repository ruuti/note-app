import { SEARCH } from '../constants';

/**
 * Search reducer
 * @param  {object} state  current state
 * @param  {object} action action object to execute
 * @return {object}        State
 */
const search = (state = { query : '' }, action) => {
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