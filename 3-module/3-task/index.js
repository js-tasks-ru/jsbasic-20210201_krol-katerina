function camelize(str) {
  let strRemastered = str
    .split('-')
    .map((w, index) => index == 0 ? w : w[0].toUpperCase() + w.slice(1))
    .join('');
  return strRemastered;
}