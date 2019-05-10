import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.scss']
})
export class OutputTableComponent implements OnInit {
  outputRows: number[];

  constructor(
    private datatableService: DatatableService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', '100%');
  }

  outputRowClick() { }

}
