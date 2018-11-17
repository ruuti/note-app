import { NOTES, CATEGORY, SEARCH } from '../constants';

export const getNotes = (notes, categories) => ({
  type: NOTES.GET_NOTES, 
  notes, 
  categories
});

export const getCategories = categories => ({
  type: CATEGORY.GET_CATEGORIES, 
  categories
});

export const selectCategory = uid => ({
  type: CATEGORY.SELECT_CATEGORY, 
  uid
});

export const setSearch = query => ({
  type: SEARCH.SET_SEARCH, 
  query
});