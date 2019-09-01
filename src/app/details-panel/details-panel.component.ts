import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.sass']
})
export class DetailsPanelComponent implements OnInit {
  @Input() accidentList: any[];

  selectedAccidentId: string = null;

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility(newSelectedId) {
    if (this.selectedAccidentId == newSelectedId) {
      this.selectedAccidentId = null;
    }
    else {
      this.selectedAccidentId = newSelectedId;
    }
  }

}
