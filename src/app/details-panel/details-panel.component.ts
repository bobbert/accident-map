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
  @Input() selectedAccident: Accident = null;
  @Output() selectAccident: EventEmitter<Accident> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility(newSelectedAccident: Accident) {
    if (newSelectedAccident == null) {
      this.selectAccident.emit(null);
    }
    else  if (this.selectedAccident == null) {
      this.selectAccident.emit(newSelectedAccident);
    }
    else if (this.selectedAccident.id === newSelectedAccident.id) {
      this.selectAccident.emit(null);
    }
    else {
      this.selectAccident.emit(newSelectedAccident);
    }
  }

}
