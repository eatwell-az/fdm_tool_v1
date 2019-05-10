import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';

@Component({
  selector: 'app-output-cell',
  templateUrl: './output-cell.component.html',
  styleUrls: ['./output-cell.component.scss']
})
export class OutputCellComponent implements OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef, private datatableService: DatatableService) { }

  ngOnInit() {
  }

}
