import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  rows = 3;
  cols = 2;
  inputRows = [];
  outputRows = [];
  inputColumns = [];
  constructor() { }

  setInputColumns() {
    for(let i = 0; i < this.cols; i++) {
      this.inputColumns.push(i);
    }
  }

  setRows() {
    for(let i = 0; i < this.rows; i++) {
      this.inputRows.push(i);
      this.outputRows.push(i);
    }
  }
}
