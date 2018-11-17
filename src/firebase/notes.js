import { notesRef } from '../firebaseRefs';

/**
 * Create a new note text to database
 */
export const addNote = categoryUid => {
  const now = new Date().getTime();
  return notesRef.push({
    text: '',
    createdAt: now,
    editedAt: now,
    categoryUid
  }).then(snap => 
    snap.key
  );
}

/**
 * Update note text to database
 * @param  {string}  uid of the note to update
 * @param  {string}  text value
 * @param  {string}  raw value of EditorState
 */
export const updateNote = (uid, text, raw) => {
  const now = new Date().getTime();
  notesRef.child(uid).update({
    text,
    editedAt: now,
    raw
  });
};

/**
 * Delete note from database
 * @param  {string} uid of the note to delete
 */
export const removeNote = uid => notesRef.child(uid).remove();

/**
 * Gets all notes from database by category uid and sets
 * categoryUid to null. 
 * Note that this will not update editedAt value.
 * @param  {string} uid Notes in this category will be updated
 */
export const unsetNoteCategoryByCategoryUid = uid => (
  notesRef.orderByChild('categoryUid').equalTo(uid)
    .once('value', snap => {
    
      const updateArray = [];
      snap.forEach(data => {
        updateArray.push(notesRef.child(data.key).update({
          'categoryUid' : null
        }));
      });

      return Promise.all(updateArray);
  })
)