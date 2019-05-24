import { Injectable } from '@angular/core';
import * as json from '../../data/SampleData.json';
import { BusinessProcess, System, DataSet, Field } from '../shared/model/cell.data';
import { CellTableManagementService } from './cell-table-management.service.js';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  inputFile: any;

  businessProcesses: BusinessProcess[] = [];
  systems: System[] = [];
  dataSets: DataSet[] = [];
  inputFields: Field[] = [];

  constructor(private cellManagement: CellTableManagementService) {

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
    let newFields: Field[];
    if (dsets.length > 0) {
      for (let i = 0; i < dsets.length; i++) {
        const {id, name, type, systems, fields } = dset[dsets[i]];

        newFields = this.setFields(fields);
        const dataset: DataSet = {id, name, type, systems, fields: newFields};
        this.dataSets.push(dataset);
      }
      this.cellManagement.buildInputObject(newFields);
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

}
