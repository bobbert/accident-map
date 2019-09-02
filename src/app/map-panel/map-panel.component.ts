import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.sass']
})
export class MapPanelComponent implements OnInit {
  @Input() accidentList: any[];
  @Input() selectedAccidentId: any[] = null;
  @Output() selectAccident: EventEmitter<any> = new EventEmitter();

  lat = 39.183917;
  lng = -76.805643;

  constructor() {
  }

  ngOnInit() {
  }

  accidentSelectedAndNotMatching(accidentId) {
    return ((this.selectedAccidentId != null) && (this.selectedAccidentId !== accidentId));
  }

}
