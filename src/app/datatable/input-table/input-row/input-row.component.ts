import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { InputCell } from 'src/app/model/cell.data';

@Component({
  selector: 'app-input-row',
  templateUrl: './input-row.component.html',
  styleUrls: ['./input-row.component.scss']
})
export class InputRowComponent implements OnInit {
  inputColumns: InputCell[];
  columnCount: number;

  constructor(private renderer: Renderer2, private elRef: ElementRef, private datatableService: DatatableService) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', 'auto auto auto');
    
    // call inputCellFactory(this.columnCount);
  }
}
