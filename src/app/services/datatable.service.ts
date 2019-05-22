import { Injectable } from '@angular/core';
import * as json from '../../data/SampleData.json';
import * as _ from 'lodash';
import { BusinessProcess, System, DataSet, Field, CellData, InputRow } from '../shared/model/cell.data';
import { CleanseOperation } from '../shared/model/cleanse.operation.js';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  rowId: number; // corresponds to css-grid row
  colId: number; // corresponds to css-grid col
  areaName: string; // css-grid area
  inputFile: any;

  businessProcesses: BusinessProcess[] = [];
  systems: System[] = [];
  dataSets: DataSet[] = [];
  inputRows: InputRow[] = [];
  inputRowz = {
    cols: ['auto'],
    cssColumns: 'auto',
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
            gridColPos: '1/2',
            postStep: 'ACCOUNT_NUMBER',
            sortOrder: 1
          },
          {
            id: 2,
            type: 'CLEANSING',
            operationSourceId: 2,
            preStep: null,
            gridColPos: '2/3',
            gridRowPos: '1/2',
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
            gridColPos: '1/2',
            gridRowPos: '2/3',
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
            gridColPos: '1/2',
            gridRowPos: '3/4',
            postStep: 'INTEREST_RATE',
            sortOrder: 1
          },
          {
            id: 2,
            type: 'CLEANSING',
            operationSourceId: 1,
            preStep: 'INTEREST_RATE',
            gridColPos: '2/3',
            gridRowPos: '3/4',
            postStep: 'INTEREST_RATE',
            sortOrder: 2
          },
          {
            id: 3,
            type: 'FORMULA',
            name: 'SCALED_INTEREST_RATE',
            formula: 'INTEREST_RATE * 100',
            operationSourceId: 1,
            preStep: null,
            gridColPos: '3/4',
            gridRowPos: '3/4',
            postStep: 'account_number',
            sortOrder: 3
          }
        ]
      }
    ]
  };

  cleanseOperations = [
    { dataType: 'CHARACTER', id: 1, icon: 'crop', name: 'trim', operation: null, isApplied: false },
    { dataType: 'CHARACTER', id: 2, icon: 'text_format', name: 'case', operation: null, isApplied: false },
    { dataType: 'NUMERIC', id: 3, icon: 'all_out', name: 'round', operation: null, isApplied: false }
  ];

  constructor() {
    this.inputFile = this.getInputFile();
    const { businessProcesses } = this.inputFile.default;
    const { systems } = this.inputFile.default;
    const { dataSets } = this.inputFile.default;
    this.setBusinessProcesses(businessProcesses);
    this.setSystems(systems);
    this.setDataSet(dataSets);
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
    if (dsets.length > 0) {
      for (let i = 0; i < dsets.length; i++) {
        const {id, name, type, systems, fields } = dset[dsets[i]];
        const iRows = dset.filter(ds => ds.type === 'FILE');

        // this.inputRows = this.setRows(iRows[0].fields);
        const newFields = this.setFields(fields);
        const dataset: DataSet = {id, name, type, systems, fields: newFields};
        this.dataSets.push(dataset);
      }
    }
  }

  private setRows(fieldSet: Field[]) {
    const rows: InputRow[] = [];
    const rowCount = Object.keys(fieldSet);

    if (rowCount.length > 0) {
      for (let i = 0; i < rowCount.length; i++) {
        const {id, name, dataType, length, businessProcesses } = fieldSet[rowCount[i]];
        const cleanseOptions = this.cleanseOperations.filter(cleanseOperation => cleanseOperation.dataType === dataType);

        const cleanseArr: number[] = [];
        cleanseOptions.map(cleanseOption => {
          cleanseArr.push(cleanseOption.id);
        });
        const cellData: CellData = {
            isOriginal: true,
            isParent: true,
            nextSibling: null,
            prevSibling: null
        };

        const field: Field = { id, name, dataType, length, businessProcesses, cellData };
        const fields: Field[] = [field];

        const row: InputRow = { id: i, cssGridValue: { gridTemplateColumns: 'auto' }, order: i, fields };
        rows.push(row);
      }
    }
    return rows;
  }

  private setFields(fieldSet: any) {
    /* const fields: Field[] = [];
    const fieldCount = Object.keys(fieldSet);

    if (fieldCount.length > 0) {
      for (let i = 0; i < fieldCount.length; i++) {
        const {id, name, dataType, length, businessProcesses } = fieldSet[fieldCount[i]];
        const cleanseOptions = this.cleanseOperations.filter(cleanseOption => cleanseOption.dataType === dataType);

        const cellData: CellData = {


            isOriginal: true,
            isParent: true,
            nextSibling: null,
            prevSibling: null

        };

        const field: Field = {id, name, dataType, length, businessProcesses, cellData};
        fields.push(field);
      }
    }

    return fields; */
  }


  private setCells() {

  }
}
