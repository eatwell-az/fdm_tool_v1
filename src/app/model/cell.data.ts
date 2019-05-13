import { CleanseOperation } from './cleanse.operation';

export interface CellData {
    cellId: CellId;
    cellType: string;
}

abstract class Base {
    constructor(public id: number) { }
}

export class BusinessProcess extends Base {
    constructor(public id: number, public name: string) {
        super(id);
    }
}

export class System extends Base {
    constructor(public id: number, public name: string) {
        super(id);
    }
}

export class DataSet extends Base {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public systems: Array<System>,
        public fields: Array<Field>
    ) {
        super(id);
    }
}

export class Field extends Base {
    constructor(
        public id: number,
        public name: string,
        public dataType: string,
        public length: number,
        public businessProcess: Array<BusinessProcess>
    ) {
        super(id);
    }
}

export class InputCell extends Field implements CellData {

    cellType = 'input';
    constructor(
        public id: number,
        public cellId: CellId,
        public name: string,
        public dataType: string,
        public length: number,
        public businessProcess: Array<BusinessProcess>
    ) {
        super(id, name, dataType, length, businessProcess);
    }

}

export class OutputCell extends Field implements CellData {
    cellType = 'input';
    constructor(
        public id: number,
        public cellId: CellId,
        public name: string,
        public dataType: string,
        public length: number,
        public businessProcess: Array<BusinessProcess>
    ) {
        super(id, name, dataType, length, businessProcess);
    }
}

export class CellId {
    constructor(public rowId: number, public colId: number, public areaId: number) {}
}






/*
import { CleanseOperation } from './cleanse.operation';

export interface CellData {
    id: string;
    name: string;
    dataType: any;
    length: number;
    scale: number;
    dataset: any;
    businessProcesses: any;
    rowIndex: number;
}

abstract class Base {
    constructor(public id: string, public name: string) { }
}

class BusinessProcess extends Base {

}

class System extends Base {

}

class DataSet extends Base {

}

class Field extends Base {
    dataType: any;
    length: number;
    businessProcesses: BusinessProcess[];
    dataSet: DataSet;
    constructor(public id: string, public name: string) {
        super(id, name);
    }
}

export class InputCell extends Field implements CellData {
    id: string;
    name: string;
    dataType: any;
    length: number;
    scale: number;
    dataset: any;
    businessProcesses: any;
    rowIndex: number;
    columnIndex: number;

    constructor() {
        super('myId', 'myName');
    }
    type: string;
    name: string;
    initValue: any;
    cleanseObj: CleanseOperation;
    siblingCells: any;
    parentCell: any;
    constructor(cellData: CellData) {
        this.type = cellData.type;
        this.name = cellData.name;
        this.initValue = '999';

        console.log(cellData);
    }
}

export class OutputCell implements CellData {
    id: string;
    name: string;
    dataType: any;
    length: number;
    scale: number;
    dataset: any;
    businessProcesses: any;
    rowIndex: number;
}

 */