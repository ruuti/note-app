import { categoryRef } from '../firebaseRefs';
import { unsetNoteCategoryByCategoryUid } from './notes';

/**
 * Create a new category to database
 * @param  {string} category name
 */
export const addCategory = title =>
  categoryRef.push({title}).then(snap => 
    snap.key
  )

/**
 * Delete category from database and delete 
 * category from notes.
 * @param  {uid} UID of the note to delete
 */
export const removeCategory = uid =>
  categoryRef.child(uid).remove(null).then(() => 
    unsetNoteCategoryByCategoryUid(uid)
  )