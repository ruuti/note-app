/**
 * Returns an object with Firebase DataSnapshot data
 * appended with key as id.
 * @param  {DataSnapshot}
 * @return {object}
 */
export const getDataFromSnap = snap => ({
  ...snap.val(),
  id: snap.key
})

/**
 * Return an array from Firebase DataSnapshot
 * @param  {DataSnapshot}
 * @return {array}
 */
export const objectsToArray = snap => {
  const array = [];
  snap.forEach(data => {
    array.push(
      getDataFromSnap(data))
  });
  return array;
}