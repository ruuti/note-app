import { categoryRef } from '../firebaseRefs';
import { unsetNoteCategoryByCategoryUid } from './notes';

/**
 * Create a new category to database
 * @param  {string} title category name
 */
export const addCategory = title =>
  categoryRef.push({title}).then(snap => 
    snap.key
  )

/**
 * Delete category from database and delete 
 * category from notes.
 * @param  {string} uid category to delete
 */
export const removeCategory = uid =>
  categoryRef.child(uid).remove(null).then(() => 
    unsetNoteCategoryByCategoryUid(uid)
  )

/**
 * Edit category title
 * @param  {string} uid   category identifier
 * @param  {string} title new category title
 */
export const editCategory = (uid, title) =>
  categoryRef.child(uid).set({title});