import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet, Field } from '../shared/model/cell.data';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DataManagementService } from '../services/data-management.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  inputTable: DataSet[];
  inputRows: Field[];
  outputRows: any;
  outputTable: DataSet[];
  datatableForm: FormGroup;
  inputColumn: any;
  showFiller = false;
  drawerIsOpen = false;

  constructor(
    private datatableService: DatatableService,
    private dataManagementService: DataManagementService,
    private renderer: Renderer2
    ) { }

  ngOnInit() {

/*     this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'grid-template-columns', '100%'); */
    // this.inputColumn = {'grid-template-columns': '1fr 30px'};
    this.inputTable = this.datatableService.dataSets.filter(inputTable => inputTable.type === 'FILE');
    this.outputTable = this.datatableService.dataSets.filter(outputTable => outputTable.type === 'TABLE');

    if (this.outputTable.length > 0) {
      for (const outputRow of this.outputTable) {
        this.outputRows = outputRow.fields;
      }
    }

    this.getDatatableForm(this.inputTable);
  }
  openStarted() {
    this.drawerIsOpen = !this.drawerIsOpen;
    console.log(this.drawerIsOpen);
  }
  getDatatableForm(inputTable: DataSet[]) {
    if (inputTable.length > 0) {
      this.inputRows = inputTable[0].fields;
      console.log(this.inputRows);
      this.inputRows.map(field => {
        if (typeof this.datatableForm === 'undefined') {
          this.datatableForm = new FormGroup({
            [field.name]: new FormControl(null)
          });
        } else {
          this.datatableForm.addControl(field.name, new FormControl(null));
        }
      });
    }
  }




}
