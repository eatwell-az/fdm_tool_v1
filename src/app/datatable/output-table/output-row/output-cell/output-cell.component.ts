import { Component, OnInit, Renderer2, ElementRef, Input } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { Field } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-output-cell',
  templateUrl: './output-cell.component.html',
  styleUrls: ['./output-cell.component.scss']
})
export class OutputCellComponent implements OnInit {

  @Input() outputRow: Field;
  constructor(private renderer: Renderer2, private elRef: ElementRef, private datatableService: DatatableService) { }

  ngOnInit() { }

}
