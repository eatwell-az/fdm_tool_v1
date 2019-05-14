import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/shared/model/cell.data';

@Component({
  selector: 'app-output-row',
  templateUrl: './output-row.component.html',
  styleUrls: ['./output-row.component.scss']
})
export class OutputRowComponent implements OnInit {
  @Input() outputRow: Field;

  constructor() { }

  ngOnInit() {
  }

}
