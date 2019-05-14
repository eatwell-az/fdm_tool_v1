import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { DataSet } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.scss']
})
export class OutputTableComponent implements OnInit {

  @Input() outputTable: DataSet[];
  outputRows: any;

  constructor(
    private datatableService: DatatableService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (this.outputTable.length > 0) {
      for (const outputRow of this.outputTable) {
        this.outputRows = outputRow.fields;
      }
    }

    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', '100%');
  }

  outputRowClick() { }

}
