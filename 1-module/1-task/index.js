/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result = 1;
  if (n > 0 && n % 1 === 0) {
    for (let i = n; i; i--) {
      result *= i;
    }
    return result;
  } else {
    return console.log('Введите целое неотрицательное число');
  }
}
