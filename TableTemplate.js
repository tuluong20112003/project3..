class TableTemplate {
  static fillIn(tableId, dict, columnName) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName("tbody")[0] || table;
    const rows = tbody.rows;

    const headerRow = rows[0];
    this._replaceTemplate(headerRow, dict);

    if (columnName) {
      const columnIndex = this._getColumnIndex(headerRow, columnName);
      if (columnIndex !== -1) {
        for (let i = 1; i < rows.length; i++) {
          const cell = rows[i].cells[columnIndex];
          this._replaceTemplate(cell, dict);
        }
      }
    } else {
      for (let i = 1; i < rows.length; i++) {
        this._replaceTemplate(rows[i], dict);
      }
    }

    table.style.visibility = "visible";
  }

  static _replaceTemplate(element, dict) {
    const templateRegex = /{{(.*?)}}/g;
    const matches = element.innerHTML.match(templateRegex);
    if (matches) {
      matches.forEach((match) => {
        const property = match.substring(2, match.length - 2);
        const value = dict[property] || "";
        element.innerHTML = element.innerHTML.replace(match, value);
      });
    }
  }

  static _getColumnIndex(headerRow, columnName) {
    for (let i = 0; i < headerRow.cells.length; i++) {
      if (headerRow.cells[i].textContent.trim() === columnName) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = TableTemplate;
