import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Accident } from '../accident';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.css']
})
export class DetailsPanelComponent implements OnInit {
  @Input() accidentList: Accident[];
  @Input() selectedAccidentId: string = null;
  @Output() selectAccident: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility(newSelectedId: string) {
    console.log('toggleVisibility: old selected = ', this.selectedAccidentId, ' new selected = ', newSelectedId);
    if (this.selectedAccidentId == newSelectedId) {
      this.selectAccident.emit({selectedAccidentId: null});
    }
    else {
      this.selectAccident.emit({selectedAccidentId: newSelectedId});
    }
  }

}
