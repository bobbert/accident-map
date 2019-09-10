import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { AccidentsService } from '../accidents.service';
import { Accident } from '../accident';
import { FilterOptions } from '../filter-options';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {
  @Output() updateFilter: EventEmitter<FilterOptions> = new EventEmitter();

  selectedFilter: FilterOptions = new FilterOptions();
  accidentDates: string[] = [];
  accidentTypes: string[] = [];
  agencyNames: string[] = [];
  carMakes: string[] = [];
  
  constructor(private accidentsService: AccidentsService) { }

  ngOnInit() {
    Promise.all([
      this.accidentsService.getDates().toPromise(),
      this.accidentsService.getAccidentTypes().toPromise(),
      this.accidentsService.getAgencyNames().toPromise(),
      this.accidentsService.getCarMakes().toPromise()
    ])
      .then(results => {
        let [accidentDates, accidentTypes, agencyNames, carMakes] = results;
        this.accidentDates = accidentDates;
        this.accidentTypes = accidentTypes;
        this.agencyNames = agencyNames;
        this.carMakes = carMakes;

        // After all dropdowns have been initialized, set to first date and initialize map
        this.selectedFilter.date = accidentDates[0];
        this.selectedFilter.reportType = '';
        this.selectedFilter.agencyName = '';
        this.selectedFilter.make = '';

        this.updateFilter.emit(this.selectedFilter);
      })
  }

  onUpdateFilter(fieldName: string, event: any) {
    if (fieldName === 'date') {
      this.selectedFilter.date = event.target.value;
    }
    if (fieldName === 'accidentType') {
      this.selectedFilter.reportType = event.target.value;
    }
    if (fieldName === 'agencyName') {
      this.selectedFilter.agencyName = event.target.value;
    }
    if (fieldName === 'carMake') {
      this.selectedFilter.make = event.target.value;
    }

    console.log('this.selectedFilter = ', this.selectedFilter);

    this.updateFilter.emit(this.selectedFilter);
  }

}
