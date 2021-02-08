/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if (str.length > 1) {
    str = str.charAt(0).toUpperCase() + str.substring(1, str.length);
    return str;
  } else {
    return str.charAt(0).toUpperCase();
  }
}
