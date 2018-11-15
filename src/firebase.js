import { notesRef, categoryRef } from './firebaseRefs';

/**
 * Create a new note text to database
 */
export const addNote = (categoryUid) => {
  const now = new Date().toISOString();
  return notesRef.push({
    text: '',
    createdAt: now,
    editedAt: now,
    categoryUid
  }).then((snap) => 
    snap.key
  );
}

/**
 * Update note text to database
 * @param  {uid}  UID of the note to update
 * @param  {text} Text value
 */
export const updateNote = (uid, text) => {
  const now = new Date().toISOString();
  notesRef.child(uid).update({
    text,
    editedAt: now
  });
};

/**
 * Delete note from database
 * @param  {uid} UID of the note to delete
 */
export const removeNote = (uid) => {
  notesRef.child(uid).remove()
};

/**
 * Create a new category to database
 * @param  {string} categoryname
 */
export const addCategory = (categoryName) => {
  return categoryRef.push({
    title: categoryName
  }).then((snap) => 
    snap.key
  );
};

/**
 * Delete category from database and delete category
 * from notes.
 * @param  {uid} UID of the note to delete
 */
export const removeCategory = (uid) => {
  return categoryRef.child(uid).remove(null).then(() => {
    return unsetNoteCategoryByCategoryUid(uid);
  });
};

/**
 * Gets all notes from database by category uid and sets
 * categoryUid to null. 
 * Note that this will not update editedAt value.
 * @param  {string} uid Notes in this category will be updated
 */
const unsetNoteCategoryByCategoryUid = (uid) => {
  return notesRef.orderByChild('categoryUid').equalTo(uid).once('value', snap => {
    
    const updateArray = [];
    snap.forEach(data => {
      const key = data.key;
      updateArray.push(notesRef.child(key).update({
        'categoryUid' : null
      }));
    });

    return Promise.all(updateArray);
  });
}