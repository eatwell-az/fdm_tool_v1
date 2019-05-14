
export class CleanseOperation {
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
