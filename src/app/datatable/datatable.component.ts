import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../services/datatable.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  constructor(private datatableService: DatatableService) { }

  ngOnInit() { }

}
