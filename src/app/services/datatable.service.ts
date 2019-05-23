import { Injectable } from '@angular/core';
import * as json from '../../data/SampleData.json';
import { BusinessProcess, System, DataSet, Field } from '../shared/model/cell.data';

import { CellTableManagementService } from './cell-table-management.service.js';
import { NewStepPackage } from '../datatable/datatable.component.js';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  inputFile: any;

  businessProcesses: BusinessProcess[] = [];
  systems: System[] = [];
  dataSets: DataSet[] = [];
  inputFields: Field[] = [];
  inputRowz: any;

  constructor(private cellTableService: CellTableManagementService) {

    this.inputFile = this.getInputFile();
    const { businessProcesses } = this.inputFile.default;
    const { systems } = this.inputFile.default;
    const { dataSets } = this.inputFile.default;
    this.setBusinessProcesses(businessProcesses);
    this.setSystems(systems);
    this.setDataSet(dataSets);
    this.inputRowz = {
      currentStepCount: 1,
      rows: [
        {
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
        },
        {
          field: {
            id: 2,
            name: 'BALANCE',
            dataType: 'NUMERIC',
            length: 25,
            businessProcesses: []
          },
          id: 2,
          sortOrder: 2,
          currentValue: 'BALANCE',
          cleanseOperations: [
            { dataType: 'NUMERIC', id: 3, icon: 'all_out', name: 'round', operation: null, isApplied: false }
          ],
          steps: [
            {
              id: 1,
              type: 'INPUT',
              operationSourceId: -1,
              preStep: null,
              style: 'grid-column: 1 / span 2',
              postStep: 'BALANCE',
              sortOrder: 1
            },
            {
              id: 2,
              type: 'CLEANSING',
              operationSourceId: 3,
              preStep: null,
              style: 'grid-column: 3 / span 2',
              postStep: 'BALANCE',
              sortOrder: 1
            }
          ]
        },
        {
          field: {
            id: 3,
            name: 'INTEREST_RATE',
            dataType: 'NUMERIC',
            length: 25,
            businessProcesses: [{id: 1}, {id: 2}]
          },
          id: 3,
          sortOrder: 3,
          currentValue: 'INTEREST_RATE',
          cleanseOperations: [
            { dataType: 'NUMERIC', id: 3, icon: 'all_out', name: 'round', operation: null, isApplied: false }
          ],
          steps: [
            {
              id: 1,
              type: 'INPUT',
              operationSourceId: -1,
              preStep: null,
              style: 'grid-column: 1 / span 2',
              postStep: 'INTEREST_RATE',
              sortOrder: 1
            },
            {
              id: 3,
              type: 'FORMULA',
              name: 'SCALED_INTEREST_RATE',
              formula: 'INTEREST_RATE * 100',
              operationSourceId: 1,
              preStep: null,
              style: 'grid-column: 4/5',
              postStep: 'account_number',
              sortOrder: 2
            }
          ]
        },
        {
          field: {
            id: 3,
            name: 'INTEREST_RATE',
            dataType: 'NUMERIC',
            length: 25,
            businessProcesses: [{id: 1}, {id: 2}]
          },
          id: 3,
          sortOrder: 3,
          currentValue: 'INTEREST_RATE',
          cleanseOperations: [
            { dataType: 'NUMERIC', id: 3, icon: 'all_out', name: 'round', operation: null, isApplied: false }
          ],
          steps: [
            {
              id: 1,
              type: 'INPUT',
              operationSourceId: -1,
              preStep: null,
              style: 'grid-column: 1 / span 2',
              postStep: 'INTEREST_RATE',
              sortOrder: 1
            },
            {
              id: 3,
              type: 'FORMULA',
              name: 'SCALED_INTEREST_RATE',
              formula: 'INTEREST_RATE * 100',
              operationSourceId: 1,
              preStep: null,
              style: 'grid-column: 4/5',
              postStep: 'account_number',
              sortOrder: 2
            }
          ]
        }
      ]
    };
  }
  get currentStep() {
    console.log('get', this.cellTableService.currentStepCount);
    return this.cellTableService.currentStepCount;
  }
  set currentStep(stepCount: number) {
    this.cellTableService.currentStepCount = stepCount;
  }

  getDatatable() {
    return {
      businessProcesses: this.businessProcesses,
      systems: this.systems,
      dataSets: this.dataSets
    }
  }

  private getInputFile() {
    return json;
  }

  private setBusinessProcesses(bproc: any) {
    const bprocs = Object.keys(bproc);
    if (bprocs.length > 0) {
      for (let i = 0; i < bprocs.length; i++) {
        const businessProcess: BusinessProcess = {id: bproc[bprocs[i]].id, name: bproc[bprocs[i]].name};
        this.businessProcesses.push(businessProcess);
      }
    }
  }

  private setSystems(syst: any) {
    const systs = Object.keys(syst);
    if (systs.length > 0) {
      for (let i = 0; i < systs.length; i++) {
        const system: System = {id: syst[systs[i]].id, name: syst[systs[i]].name};
        this.systems.push(system);
      }
    }
  }

  private setDataSet(dset: any) {
    const dsets = Object.keys(dset);
    let newFields: Field[];
    if (dsets.length > 0) {
      for (let i = 0; i < dsets.length; i++) {
        const {id, name, type, systems, fields } = dset[dsets[i]];

        newFields = this.setFields(fields);
        const dataset: DataSet = {id, name, type, systems, fields: newFields};
        this.dataSets.push(dataset);
      }
      this.getInputObject(newFields);
    }
  }

  setFields(fieldSet: any) {
    const fields: Field[] = [];
    const fieldCount = Object.keys(fieldSet);

    if (fieldCount.length > 0) {
      for (let i = 0; i < fieldCount.length; i++) {
        const {id, name, dataType, length, businessProcesses } = fieldSet[fieldCount[i]];

        const field: Field = {id, name, dataType, length, businessProcesses};
        fields.push(field);
      }
    }

    return fields;
  }

  getInputObject(fields: Field[]) {
    return this.cellTableService.buildInputRows(fields);
  }
}
