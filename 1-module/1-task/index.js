/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result = 1;
  for (let i = n; i; i--) {
    result *= i;
  }
  return result;
}
