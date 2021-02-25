function highlight(table) {
  let row = table.getElementsByTagName('tr');
  let indexGender;
  let indexAge;
  let indexStatus;

  for (let i = 0; i < row[0].children.length; i++) {
    if (row[0].children[i].innerHTML === 'Age') {
      indexAge = i;
    }
    if (row[0].children[i].innerHTML === 'Gender') {
      indexGender = i;
    }
    if (row[0].children[i].innerHTML === 'Status') {
      indexStatus = i;
    }
  };

  let classes = {
    m: 'male',
    f: 'female',
    true: 'available',
    false: 'unavailable'
  }

  for (let m = 1; m < row.length; m++) {
    let classGender = row[m].children[indexGender];
    classGender.parentNode.classList.add(classes[classGender.innerHTML]);
    let classAge = row[m].children[indexAge].innerHTML;
    if (classAge < 18) {
      classGender.parentNode.setAttribute('style', 'text-decoration: line-through');
    }
    let classStatus = row[m].children[indexStatus];
    if (classStatus.hasAttribute('data-available')) {
      let elem = classStatus.getAttribute('data-available');
      classStatus.parentNode.classList.add(classes[elem]);
    } else {
      classStatus.parentNode.hidden = true;
    }
  }
}