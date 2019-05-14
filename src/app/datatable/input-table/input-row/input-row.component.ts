import { Component, OnInit, Renderer2, ElementRef, Input } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { Field } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-input-row',
  templateUrl: './input-row.component.html',
  styleUrls: ['./input-row.component.scss']
})
export class InputRowComponent implements OnInit {
  @Input() inputRow: Field;
  constructor(private renderer: Renderer2, private elRef: ElementRef, private datatableService: DatatableService) { }

  ngOnInit() {

    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');

    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', `auto`);

    // call inputCellFactory(this.columnCount);
  }
}
