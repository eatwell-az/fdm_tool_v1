import { Injectable } from '@angular/core';
import { Step, Field, InputRow, InputObject } from '../shared/model/cell.data';
import { CLEANSE_OPERATIONS } from '../shared/model/cleanse.operation';
import { NewStepPackage } from '../datatable/datatable.component';

@Injectable({
  providedIn: 'root'
})
export class CellTableManagementService {
  currentStepCount: number;
  sortOrder: number;
/* {
    field: {
    id: 1,
    name: 'ACCOUNT_NUMBER',
    dataType: 'CHARACTER',
    length: 25,
    businessProcesses: []
    },
    id: 1,
    sortOrder: 1,
    currentValue: 'account_number',
    cleanseOperations: [
    { dataType: 'CHARACTER', id: 1, icon: 'crop', name: 'trim', operation: null, isApplied: false },
    { dataType: 'CHARACTER', id: 2, icon: 'text_format', name: 'case', operation: null, isApplied: true }
    ],
    steps: [
      {
          id: 1,
          type: 'INPUT',
          operationSourceId: -1,
          preStep: null,
          style: 'grid-column: 1 / 2',
          postStep: 'ACCOUNT_NUMBER',
          sortOrder: 1
      },
      {
          id: 2,
          type: 'CLEANSING',
          operationSourceId: 2,
          preStep: null,
          style: 'grid-column: 2 / span 3',
          postStep: 'account_number',
          sortOrder: 1
      }
    ]
}*/

  constructor() {
    this.currentStepCount = 1;
    this.sortOrder = 1;
  }

  newStep(newStepPackage: NewStepPackage) {
    this.currentStepCount++;
    console.log('step: ', this.currentStepCount);
    console.log(newStepPackage);
  }

  buildInputRows(fields: Field[]): InputObject {

    const rows: InputRow[] = [];
    for(const field of fields) {
      const cleanseOperations = CLEANSE_OPERATIONS.filter(cleanseOption => cleanseOption.dataType === field.dataType);
      const step: Step = {
        id: 1,
        operationSourceId: -1,
        postStep: field.name,
        preStep: null,
        sortOrder: 0,
        style: 'grid-column: ' + this.currentStepCount + ' / 2',
        type: 'INPUT'
      };
      const inputRow: InputRow = {
        field,
        id: field.id,
        currentValue: field.name,
        sortOrder: this.sortOrder,
        cleanseOperations,
        steps: [step]
      }
      rows.push(inputRow);
    }
    const inputObj: InputObject = {
      currentStepCount: this.currentStepCount,
      rows
    }
    return inputObj;
  }

  getSteps(id: number, type: string) {
    
  }
}
