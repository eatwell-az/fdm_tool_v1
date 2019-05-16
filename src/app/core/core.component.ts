import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../services/datatable.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  panelContainer: any = {
    'mat-expansion-panel': true
  };

  panelHeader: any = { };

  constructor(private datatableService: DatatableService) { }

  ngOnInit() {
    // console.log(this.datatableService.systems);
  }

}
