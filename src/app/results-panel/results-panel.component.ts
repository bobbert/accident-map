import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Accident } from '../accident';

@Component({
  selector: 'app-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.css']
})
export class ResultsPanelComponent implements OnInit {
  @Input() accidentList: Accident[];
  @Input() selectedAccident: Accident = null;
  @Output() selectAccident: EventEmitter<Accident> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  isSelected(accidentId: string) {
    return ((this.selectedAccident != null) && (accidentId === this.selectedAccident.id));
  }

  toggleVisibility(newSelectedAccident: Accident) {
    console.log('newSelectedAccident = ', newSelectedAccident);
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
