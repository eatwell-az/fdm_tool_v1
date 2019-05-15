import { Component, OnInit } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { BusinessProcess } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-header-column-right',
  templateUrl: './header-column-right.component.html',
  styleUrls: ['./header-column-right.component.scss']
})
export class HeaderColumnRightComponent implements OnInit {
  businessProcessess: BusinessProcess[];
  value: string;
  constructor(private datatableService: DatatableService) { }

  ngOnInit() {
    this.businessProcessess = this.datatableService.businessProcesses;
  }

}
