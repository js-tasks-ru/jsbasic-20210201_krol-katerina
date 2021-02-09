/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  let cuttedStr = '';
  if (str.length > maxlength) {
    for (i = 0; i < maxlength - 1; i++) {
      cuttedStr += str[i];
    }
    return cuttedStr + '…';
  } else {
    return str;
  }
  //-альтернативное решение
  /*if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + '…';
  } else {
    return str;
  }*/
}
