import { Component, OnInit } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';

@Component({
  selector: 'app-input-cell',
  templateUrl: './input-cell.component.html',
  styleUrls: ['./input-cell.component.scss']
})
export class InputCellComponent implements OnInit {
  inputColumns: number[];

  constructor(private datatableService: DatatableService) { }

  ngOnInit() { }

}
