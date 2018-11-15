import { CATEGORY } from '../constants';

const initialState = {
  categoriesLoaded : false,
  categories:[],
  selectedCategory : null
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY.GET_CATEGORIES:
      return {
        ...state,
        categoriesLoaded: true,
        categories: action.categories
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