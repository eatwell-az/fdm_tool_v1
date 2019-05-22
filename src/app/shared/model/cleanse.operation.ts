import { Base } from './cell.data';
import { Pipe } from '@angular/compiler/src/core';

export interface CleanseOperation extends Base {
    id: number;
    dataType: string;
    name: string;
    icon: string;
    operation: Pipe;
    isApplied: boolean;
}

