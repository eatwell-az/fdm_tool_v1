import { Injectable } from '@angular/core';
import {
  Step,
  Field,
  InputRow,
  InputObject,
  FormulaField,
  Icon,
  ICONS,
  RowType,
  FormulaDependency
} from '../shared/model/cell.data';
import { CLEANSE_OPERATIONS, CleanseOperation, CleanseOption } from '../shared/model/cleanse.operation';
import { NewStepPackage } from '../datatable/datatable.component';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CellTableManagementService {
  currentStepCount: number;
  sortOrder: number;
  inputObject: InputObject;
  rowGridColumnChanged = new Subject();

  constructor() {
    this.currentStepCount = 1;
    this.sortOrder = 1;
  }

  gridTemplateColumnCss(row: InputRow) {
    const maxWidth = 814;

    const columnsPercentArr: number[] = [];
    _.forEach(this.inputObject.rows, (value) => {
      if (row.type === RowType.Formula) {
        
      }
      if (value.steps.length > this.currentStepCount) {
        this.createNewColumn();
      }
    });

    for (let i = 0; i < this.currentStepCount; i++) {
      columnsPercentArr.push(maxWidth / this.currentStepCount / (maxWidth / 100));
    }

    const columnsPercent = columnsPercentArr.join('% ') + '%';
    this.rowGridColumnChanged.next(columnsPercent);
    row.cssGridColumns = columnsPercent;
    let columnWidth = 100;
    const cssTransitionArr: number[] = [];
    if (this.currentStepCount - 1 > 0) {
      columnWidth = (814 / (this.currentStepCount - 1)) / (814 / 100);
    }

    for (let i = 0; i < columnsPercentArr.length; i++) {
      cssTransitionArr.push(columnWidth);
    }
    cssTransitionArr.splice((cssTransitionArr.length - 1), 1, 0);

    /* let count = 0;
      const animate = setInterval(() => {
      count++;
      for (let i = 0; i < cssTransitionArr.length - 1; i++) {
        cssTransitionArr[i] -= 1;
        cssTransitionArr[cssTransitionArr.length - 1] += 1;
        cssGridColumnValue = cssTransitionArr.join('% ') + '%';
        if (cssTransitionArr[i] === count) {
          clearInterval(animate);
        }
      }
    }, 5);
    */
    return columnsPercent;

  }

  groomGrid() {
    for (let i = 0; i < this.inputObject.rows.length; i++) {
      this.gridTemplateColumnCss(this.inputObject.rows[i]);
    }
  }

  createNewColumn() {
    this.currentStepCount++;
  }

  makeNewStep(inputRow: InputRow, icon: Icon, parentRow?: InputRow, parentStep?: Step): Step {
    let startColumn: number, endColumn: number, operationSourceId: number;
    const stepPackage = this.makeNewStepPackage(inputRow, icon, parentRow, parentStep);
    let stepId: number;

    if (isFormula() && parentRow) {
      if (isPlaceholder()) {
        startColumn = inputRow.steps[inputRow.steps.length - 1].endColumn;
        endColumn = startColumn + 1;
      } else if (parentStep) {
        startColumn = parentStep.endColumn;
        endColumn = startColumn + 1;
      }
    } else if (hasAppliedTo()) {
      startColumn = stepPackage.appliedToStep.endColumn;
      endColumn = startColumn + 1;
    } else if (isInput()) {
      startColumn = 1;
      endColumn = 2;
    } else if (isPlaceholder()) {
      startColumn = oldestPlaceholderLocation().startColumn;
      endColumn = oldestPlaceholderLocation().endColumn;
      operationSourceId = 0;
    }

    if (stepPackage.appliedToStep === null || stepPackage.appliedToStep === undefined) {
      stepId = inputRow.id;
    } else {
      stepId = stepPackage.appliedToStep.id;
    }

    const appliedToStep: Step  = {
      id: inputRow.steps.length,
      type: icon.name,
      operationSourceId,
      preStep: '',
      style: '',
      startColumn,
      endColumn,
      isPlaceholder: (icon.name === 'placeholder' ? true : false),
      postStep: (inputRow.currentValue === '' ? parentStep.postStep : inputRow.currentValue),
      sortOrder: inputRow.steps.length,
      stepIcon: icon
    };
    console.log(inputRow, icon, parentRow, parentStep);
    const step: Step = {
      id: inputRow.steps.length,
      operationSourceId: appliedToStep.id,
      postStep: appliedToStep.postStep,
      preStep: appliedToStep.preStep,
      sortOrder: appliedToStep.sortOrder,
      style: 'grid-column: ',
      startColumn,
      endColumn,
      type: icon.type,
      stepIcon: icon,
      isPlaceholder: appliedToStep.isPlaceholder
    };

    function hasAppliedTo(): boolean {
      return stepPackage.appliedToStep ? true : false;
    }

    function isFormula(): boolean {
      return inputRow.type === RowType.Formula ? true : false;
    }

    function isInput(): boolean {
      return icon.type === 'INPUT' ? true : false;
    }

    function isPlaceholder(): boolean {
      return icon.type === 'PLACEHOLDER' ? true : false;
    }

    function lastStepLocation(): {startColumn: number, endColumn: number} {
      return {startColumn: parentRow.steps[parentRow.steps.length - 1].startColumn,
         endColumn: parentRow.steps[parentRow.steps.length - 1].endColumn};
    }

    function oldestPlaceholderLocation(): {startColumn: number, endColumn: number} {
      const oldPlaceholder = inputRow.steps.find(oldestPlaceholder => oldestPlaceholder.isPlaceholder)
      return {startColumn: oldPlaceholder.startColumn, endColumn: oldPlaceholder.endColumn};
    }

    return step;
  }

  makeNewStepPackage(inputRow: InputRow, icon: Icon, parentRow?: InputRow, parentStep?: Step): NewStepPackage {
    const { currentValue, id, steps } = inputRow;
    let appliedToStep: Step;

    if (parentStep) {
      appliedToStep = parentStep;
    } else {
      if (steps.length > 0 && icon.type !== 'INPUT') {
        if (icon.type === 'PLACEHOLDER') {
          appliedToStep = steps[steps.length - 1];
        } else {
          appliedToStep = getMostRecentNonPlaceholderStep(steps);
        }
      } else if (steps.length === 0 && icon.type === 'FORMULA' && parentRow) {
        appliedToStep = getMostRecentNonPlaceholderStep(steps);
      }
    }

    const newStepPackage: NewStepPackage = {
      postStep: currentValue,
      inputRowId: id,
      stepType: icon.type,
      data: icon,
      appliedToStep
    };

    function getMostRecentNonPlaceholderStep(_steps: Step[]): Step | null {
      let eligibleApplyToStep: Step;

      if (icon.type === 'FORMULA') {
        eligibleApplyToStep = parentRow.steps.find(step => step.isPlaceholder === false);
      } else if (icon.type === 'CLEANSING') {
        const eligibleApplyToSteps = _steps.filter(_step => _step.isPlaceholder === false || _step.isPlaceholder === undefined);
        eligibleApplyToStep = eligibleApplyToSteps[eligibleApplyToSteps.length - 1];
      } else if (icon.type === 'PLACEHOLDER') {

      }

      return eligibleApplyToStep;
    }
    return newStepPackage;
  }

  makeNewCleanseOptions(field: Field | FormulaField): CleanseOperation[] {
    const cleanseOptions: CleanseOperation[] = [];
    for (const cOption of CLEANSE_OPERATIONS) {
      if (field.dataType === cOption.dataType) {
        const {dataType, icon, id, isApplied, name, operation} = cOption;
        const cleanseOption = new CleanseOption(id, dataType, name, icon, operation, isApplied);
        cleanseOptions.push(cleanseOption);
      }
    }

    return cleanseOptions;
  }

  updateFieldDependency(childRow: InputRow, parentRow: InputRow) {

    function highestOrder (dependencies: FormulaDependency, currentDependency: FormulaDependency) {
      return dependencies.order < currentDependency.order ? currentDependency : null;
    }

    const bindChildToParent: FormulaDependency = {
      order: parentRow.field.dependsOn.reduce(highestOrder).order + 1,
      row: childRow
    };
    parentRow.field.dependsOn.push(bindChildToParent);

    const bindParentToChild: FormulaDependency = {
      order: 1,
      row: parentRow
    }
    childRow.field.dependsOn.push(bindParentToChild);
    return;
  }

  makeNewFormulaRow(parentRow: InputRow, stepIcon: Icon, onParentStep: Step, order?: number) {
    const {id, dataType, length, businessProcesses} = parentRow.field;

    const childField: FormulaField = {
      id, name, dataType, length, businessProcesses,
      formula: '100 * ' + parentRow.field.name,
      dependsOn: []
    };

    childField.id = childField.id + 100;

    const childRow = this.makeNewInputRow(childField, RowType.Formula, stepIcon, parentRow, onParentStep);
    this.updateFieldDependency(childRow, parentRow);
    if (this.currentStepCount + 1 - childRow.steps[childRow.steps.length - 1].endColumn > 0) {
      this.placeholderOrNewColumn(childRow, stepIcon, onParentStep, parentRow);
    }
    this.inputObject.rows.push(childRow);
    return;
  }

  placeholderOrNewColumn(inputRow: InputRow, icon: Icon, step: Step, parentRow: InputRow) {
    const placeholderIcon: Icon = ICONS.find(i => i.type === 'PLACEHOLDER');
    if (isPlaceholder(step)) {
      const firstPlaceholder = inputRow.steps.find(firstPlaceholderStep => firstPlaceholderStep.isPlaceholder);
      if (isParent()) {
        const index = inputRow.steps.findIndex(stp => stp === firstPlaceholder);
        inputRow.steps.splice(index, 1);
        if (isCleansing(icon)) {
          insertStep(this.makeNewStep(inputRow, icon, parentRow), index);
        }
      }
    } else if (isParent()) {
      if (isCleansing(icon)) {
        insertStep(this.makeNewStep(inputRow, icon, parentRow, step));
      } else if (isFormula() && parentRow.steps[parentRow.steps.length - 1] === step) {
        this.createNewColumn();
        insertStep(this.makeNewStep(inputRow, icon, parentRow, step))
      }
    } else if (isCleansing(icon)) {
      insertStep(this.makeNewStep(inputRow, placeholderIcon));
    } else if (isFormula()) {
      if (this.currentStepCount + 1 - inputRow.steps[inputRow.steps.length - 1].endColumn > 0) {
        const placeholdersNeeded = this.currentStepCount + 1 - inputRow.steps[inputRow.steps.length - 1].endColumn;
        for (let i = 0; i < placeholdersNeeded; i++) {
          console.log(placeholdersNeeded);
          insertStep(this.makeNewStep(inputRow, placeholderIcon, parentRow, step));
        }
      }
    }

    function isParent(): boolean {
      return parentRow === inputRow ? true : false;
    }

    function isFormula(): boolean{
      return icon.type === 'FORMULA' ? true : false;
    }

    function isCleansing(iconCheck: Icon): boolean {
      return iconCheck.type === 'CLEANSING' ? true : false;
    }

    function isPlaceholder(stepCheck: Step): boolean {
      return stepCheck.isPlaceholder ? true : false;
    }

    function insertStep(newStep: Step, stepIndex?: number) {
      stepIndex ? inputRow.steps.splice(stepIndex, 0, newStep) : inputRow.steps.push(newStep);
      return;
    }

    /* if (this.inputObject.rows[i].steps[this.inputObject.rows[i].steps.length - 1].isPlaceholder) {
      this.inputObject.rows[i].steps.splice(this.inputObject.rows[i].steps.length - 1, 1, newStep);
    } else {
      this.inputObject.rows[i].steps.push(newStep);
    }
    newStepIcon = ICONS.find(icon => icon.name === 'placeholder');
          const newStep = this.makeNewStep(this.inputObject.rows[i], newStepIcon);
          this.inputObject.rows[i].steps.push(newStep); */

  }

  updateCleansingOptions(cleanseOperations: CleanseOperation[], stepIcon: Icon) {
    const cleanseOperationApplied = cleanseOperations.find(cleanseOperation => cleanseOperation.name === stepIcon.name);
      if (cleanseOperationApplied) {
        cleanseOperationApplied.isApplied = true;
      }
    return;
  }

  updateInputRow(inputRow: InputRow, stepIcon: Icon, step?: Step) {
/*     if (inputRow.steps[inputRow.steps.length - 1] === step) {
      this.createNewColumn();
    } */
    if (stepIcon.type === 'FORMULA') {
        this.makeNewFormulaRow(inputRow, stepIcon, step);
    }
    for (let i = 0; i < this.inputObject.rows.length; i++) {
      if (inputRow.id === this.inputObject.rows[i].id) {
        if (stepIcon.type === 'CLEANSING') {
          this.updateCleansingOptions(inputRow.cleanseOperations, stepIcon);
        }
      }
      this.placeholderOrNewColumn(this.inputObject.rows[i], stepIcon, step, inputRow);
    }
    this.groomGrid();
  }

  makeNewInputRow(field: Field | FormulaField, type: RowType, icon?: Icon, parentRow?: InputRow, parentStep?: Step): InputRow {
    const newInputRow: InputRow = {
        field,
        id: field.id,
        currentValue: field.name,
        sortOrder: this.sortOrder,
        cleanseOperations: this.makeNewCleanseOptions(field),
        steps: [],
        type,
        cssGridColumns: '100%'
      };

      if (icon.type === 'INPUT') {
        const independent: FormulaDependency = {
          order: 0,
          row: newInputRow
        };
        field.dependsOn.push(independent);
      }
      /* if (icon.type === 'FORMULA' && parentRow) {
        const parent: FormulaDependency = {
          order: parentRow.steps.length,
          row: parentRow
        };
        field.dependsOn.push(child)
      } */

      let step: Step;
      if (icon.type === 'INPUT') {
        step = this.makeNewStep(newInputRow, icon);
      } else {
        step = this.makeNewStep(newInputRow, icon, parentRow, parentStep);
      }

      newInputRow.steps.push(step);
      if (icon.type === 'FORMULA') {
        newInputRow.cssGridColumns = this.gridTemplateColumnCss(newInputRow);
      }
    return newInputRow;
  }

  makeInputObject(fields: Field[]) {
    const rows: InputRow[] = [];
    const icon: Icon = ICONS.find(i => {
      return i.name === 'input';
    });
    for (const field of fields) {
      field.dependsOn = [];
      const inputRow = this.makeNewInputRow(field, RowType.Input, icon);
      rows.push(inputRow);
    }
    this.inputObject = { rows };

    return this.inputObject;
  }
}
