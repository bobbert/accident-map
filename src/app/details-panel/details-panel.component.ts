import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.sass']
})
export class DetailsPanelComponent implements OnInit {
  @Input() accidentList: any[];
  @Input() selectedAccidentId: any[];
  @Output() selectAccident: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleVisibility(newSelectedId) {
    console.log('toggleVisibility: old selected = ', this.selectedAccidentId, ' new selected = ', newSelectedId);
    if (this.selectedAccidentId == newSelectedId) {
      this.selectAccident.emit({selectedAccidentId: null});
    }
    else {
      this.selectAccident.emit({selectedAccidentId: newSelectedId});
    }
  }

}
