import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet } from '../shared/model/cell.data';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  inputTable: DataSet[];
  outputTable: DataSet[];

  constructor(private datatableService: DatatableService) { }

  ngOnInit() {
    this.inputTable = this.datatableService.dataSets.filter(inputTable => inputTable.type === 'FILE');
    this.outputTable = this.datatableService.dataSets.filter(outputTable => outputTable.type === 'TABLE');
  }

}
