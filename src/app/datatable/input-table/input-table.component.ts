import { Component, OnInit, HostBinding, Renderer2, ElementRef, Input } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { DataSet, InputRow, Field } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit {

  @Input() inputTable: DataSet[];
  inputRows: Field[];

  constructor(
    private datatableService: DatatableService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    if (this.inputTable.length > 0) {
      for (const inputRow of this.inputTable) {
        this.inputRows = inputRow.fields;
      }
    }

    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', 'auto');
  }
}

