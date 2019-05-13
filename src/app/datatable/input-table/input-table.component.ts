import { Component, OnInit, HostBinding, Renderer2, ElementRef } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit {
  inputRows: number[];

  constructor(
    private datatableService: DatatableService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', 'auto');
  }

  setGridColumns() { }

  inputRowClick() { }
}

