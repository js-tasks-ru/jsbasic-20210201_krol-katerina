/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let total = 0;
  for (let value in salaries) {
    if (typeof salaries[value] == 'number' && !Number.isNaN(salaries[value]) && isFinite(salaries[value])) {
      total += salaries[value];
    } else {
      total += 0;
    }
  }
  return total;
}