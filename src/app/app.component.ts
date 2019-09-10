import { Component, OnInit } from '@angular/core';

import { AccidentsService } from './accidents.service';
import { Accident } from './accident';
import { FilterOptions } from './filter-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'accident-map';
  accidentsByDate: Accident[] = [];
  selectedAccident: Accident = null;

  constructor(private accidentsService: AccidentsService) { }

  ngOnInit() {}

  getAccidentsByFilter(selectedFilter: FilterOptions) {
    return this.accidentsService
      .getFilteredAccidents(selectedFilter)
      .subscribe((res: Accident[]) => {
        if (res.length > 1000) {
          // TODO: use something better than an alert box
          alert('Resultset is too large; only showing first 1000 accidents.');
          this.accidentsByDate = res.slice(0, 1000);
        }
        else {
          this.accidentsByDate = res;
        }
        // reset selected accident after map markers reload
        this.selectedAccident = null;
    });
  }

  onSelectAccident(selectedAccident: Accident) {
    this.selectedAccident = selectedAccident;
  }

  onUpdateFilter(selectedFilter: FilterOptions) {
    return this.getAccidentsByFilter(selectedFilter);
  }  
}
