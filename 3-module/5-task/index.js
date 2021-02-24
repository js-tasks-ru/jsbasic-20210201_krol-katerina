function getMinMax(str) {
  let arr = str.split(/[ ,]+/);
  let minValue = +arr[0];
  let maxValue = minValue;
  for (let i = 0; i < arr.length; i++) {
    let e = +arr[i];
    if (e < minValue) minValue = e;
    if (e > maxValue) maxValue = e;
  }
  return {min: minValue, max: maxValue};
}
