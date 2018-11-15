import { combineReducers } from 'redux'
import notes from './notes';
import categories from './categories';
import search from './search';

export default combineReducers({
  notes,
  categories,
  search
})