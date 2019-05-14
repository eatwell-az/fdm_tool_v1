import { Component, OnInit, Input } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { Field } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-input-cell',
  templateUrl: './input-cell.component.html',
  styleUrls: ['./input-cell.component.scss']
})
export class InputCellComponent implements OnInit {

  @Input() inputRow: Field;
  constructor(private datatableService: DatatableService) { }

  ngOnInit() {
    console.log(this.inputRow);
  }

}
