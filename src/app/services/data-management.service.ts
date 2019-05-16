import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  cellCount: number;

  constructor() {
    this.cellCount = 1;
  }

}
