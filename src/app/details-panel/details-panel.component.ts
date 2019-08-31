import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.sass']
})
export class DetailsPanelComponent implements OnInit {
  @Input() accidentList: any[];

  constructor() { }

  ngOnInit() {
  }

}
