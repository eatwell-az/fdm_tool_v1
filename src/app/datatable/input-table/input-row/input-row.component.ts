import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { LowerCasePipe } from '@angular/common';

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
    this.columnCount = this.datatableService.cols;
    // call inputCellFactory(this.columnCount);
  }

  inputCellFactory(count: number = 0) {
    for(let i = 0; i < count; i++) {
      const id: string = i.toString() + '-cell';
      const cellData: CellData = {type: 'number', name: id }; // testing mock object
      const newCell: InputCell = new InputCell(cellData);

      this.inputColumns.push(newCell);
    }
  }
}

interface CellData {
  type: string;
  name: string;
}

class InputCell implements CellData {
  type: string;
  name: string;
  initValue: any;
  cleanseObj: CleanseOption;
  siblingCells: any;
  parentCell: any;
  constructor(cellData: CellData) {
    this.type = cellData.type;
    this.name = cellData.name;
    this.initValue = '999';

    console.log(cellData);
  }
}

class CleanseOption {
  type: string;
  applied: boolean;
  icon: string;
  anyOrder: boolean;
  effect: any;
  constructor(type: string) {
    this.applied = false;
    this.icon = '';
    this.anyOrder = true;
    this.effect = ['pipe1', 'pipe2'];
    // array of available pipes compat w/ type
    // DecimalPipe
    // PercentPipe
    // CurrencyPipe
    // KeyValuePipe
  }
}
