import { Injectable } from '@angular/core';
import { Step, Field, InputRow, InputObject, FormulaField } from '../shared/model/cell.data';
import { CLEANSE_OPERATIONS, CleanseOperation, CleanseOption } from '../shared/model/cleanse.operation';
import { NewStepPackage } from '../datatable/datatable.component';

@Injectable({
  providedIn: 'root'
})
export class CellTableManagementService {
  currentStepCount: number;
  sortOrder: number;

  constructor() {
    this.currentStepCount = 1;
    this.sortOrder = 1;
  }

  incrementStepCount(step: number) {
    if (step === this.currentStepCount) {
      this.currentStepCount++;
    }
  }

  makeNewStep(stepPackage: NewStepPackage, icon: string): Step {

    this.currentStepCount++;

    const step: Step = {
      id: stepPackage.appliedToStep.id + 1,
      operationSourceId: stepPackage.appliedToStep.id,
      postStep: stepPackage.postStep,
      preStep: 'pre',
      sortOrder: stepPackage.appliedToStep.sortOrder,
      style: 'grid-column: ',
      startColumn: this.currentStepCount,
      endColumn: (this.currentStepCount + 1),
      type: 'CLEANSING',
      stepIcon: icon
    };

    return step;
  }
  addRow() {
    // create everything needed for a new inputrow
    // call input row
  }

  makeNewFormulaField(fieldData: FormulaField) {
    
  }

  remodelSteps(inputObj: InputObject, alteredRowId) {
    for (const row of inputObj.rows) {
      if (alteredRowId !== row.id) {
        row.steps[row.steps.length - 1].endColumn = row.steps[row.steps.length - 1].endColumn + 1;
      }
    }
  }

  buildInputObject(fields: Field[]): InputObject {
    const rows: InputRow[] = [];

    for (const field of fields) {

      const step: Step = {
        id: 1,
        operationSourceId: 0,
        postStep: field.name,
        preStep: null,
        sortOrder: 0,
        type: 'INPUT',
        startColumn: this.currentStepCount,
        endColumn: (this.currentStepCount + 1),
        style: 'grid-column: ',
        stepIcon: 'input'
      };

      const cleanseOptions: CleanseOperation[] = [];
      for (const cOption of CLEANSE_OPERATIONS) {
        if (field.dataType === cOption.dataType) {
          const {dataType, icon, id, isApplied, name, operation} = cOption;
          const cleanseOption = new CleanseOption(id, dataType, name, icon, operation, isApplied);
          cleanseOptions.push(cleanseOption);
        }
      }

      const inputRow: InputRow = {
        field,
        id: field.id,
        currentValue: field.name,
        sortOrder: this.sortOrder,
        cleanseOperations: cleanseOptions,
        steps: [step]
      };
      rows.push(inputRow);
    }

    const inputObj: InputObject = { rows };

    return inputObj;
  }
}
