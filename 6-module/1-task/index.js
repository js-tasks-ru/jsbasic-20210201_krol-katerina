/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.addTable();
    this.deleteTableRow();
  }
  addTable() {
    let tb, tr, td;
    tb = document.createElement('tbody');
    this.elem.appendChild(tb);
    for(let rowsItem of this.rows) {
      tr = document.createElement('tr');
      tb.appendChild(tr);
      for(let cellItem in rowsItem) {
        td = document.createElement('td');
        td.innerHTML = rowsItem[cellItem];
        tr.appendChild(td);
      }
      tr.insertAdjacentHTML('beforeend', '<td><button>X</button></td>');
    }
  }
  deleteTableRow() {
    let buttonCollection = this.elem.querySelectorAll('button');
    for(let button of buttonCollection) {
      button.addEventListener('click', () => {
        button.parentNode.parentNode.remove();
      });
    }
  }
}
