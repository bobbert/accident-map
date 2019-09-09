import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Accident } from '../accident';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.css']
})
export class MapPanelComponent implements OnInit {
  @Input() accidentList: Accident[];
  @Input() selectedAccident: Accident = null;
  @Output() selectAccident: EventEmitter<Accident> = new EventEmitter();

  lat = 39.183917;
  lng = -76.805643;

  constructor() {
  }

  ngOnInit() {
  }

  accidentSelectedAndNotMatching(accidentId) {
    return ((this.selectedAccident != null) && (this.selectedAccident.id !== accidentId));
  }

  onClickAccident(newSelectedAccident: Accident) {
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
