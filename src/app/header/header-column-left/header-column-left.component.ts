import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-header-column-left',
  templateUrl: './header-column-left.component.html',
  styleUrls: ['./header-column-left.component.scss']
})
export class HeaderColumnLeftComponent implements OnInit {
  options: FormGroup;
  @Input()
  panelClass: string | string[] | Set<string> | { [key: string]: any; };

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
  }

}
