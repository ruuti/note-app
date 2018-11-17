import { CATEGORY } from '../constants';

const initialState = {
  categoriesLoaded : false,
  categories:[],
  selectedCategory : null
};

// Default category cannot be deleted
const defaultCategory = {
  id : null,
  title : 'All notes',
  isDefault : true
}

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