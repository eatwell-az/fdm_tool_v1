import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { System, DataSet } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-header-column-left',
  templateUrl: './header-column-left.component.html',
  styleUrls: ['./header-column-left.component.scss']
})
export class HeaderColumnLeftComponent implements OnInit {
  systems: System[];
  inputs: DataSet[];
  options: FormGroup;
  @Input()
  panelClass: string | string[] | Set<string> | { [key: string]: any; };

  constructor(fb: FormBuilder, private datatableService: DatatableService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.inputs = this.datatableService.dataSets;
    this.systems = this.datatableService.systems;
  }

}
