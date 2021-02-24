function showSalary(users, age) {
  let filteredArray;
  filteredArray = users.filter(item => item.age <= age);
  return filteredArray.map(item => item.name + ', ' + item.balance).join (`\n`);
}
