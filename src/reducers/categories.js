import { CATEGORY } from '../constants';

const initialState = {
  categoriesLoaded : false,
  categories:[],
  selectedCategory : null
};

// Default category (folder) that cannot be deleted or
// edited and is visible on left sidebar all the time.
const defaultCategory = {
  id : null,
  title : 'All notes',
  isDefault : true
}

/**
 * Categories reducer
 * @param  {object} state  current state
 * @param  {object} action action object to execute
 * @return {object}        State
 */
const categories = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY.GET_CATEGORIES:
      return {
        ...state,
        categoriesLoaded: true,
        categories: [
          defaultCategory, 
          ...action.categories
        ]
      };
    case CATEGORY.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.uid
      };
    default:
      return state
  }
}

export default categories;