import { Component, OnInit } from '@angular/core';

import { AccidentsService } from './accidents.service';
import { Accident } from './accident';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'accident-map';
  accidentsByDate: Accident[] = [];
  accidentDates: string[] = [];
  selectedAccident: Accident = null;

  constructor(private accidentsService: AccidentsService) { }

  ngOnInit() {
    this.getDates();
  }

  getDates() {
    return this.accidentsService.getDates().subscribe((res: string[]) => {
      this.accidentDates = res;
      this.getAccidentsByDate(this.accidentDates[0]);
    });
  }

  getAccidentsByDate(dateString: string) {
    return this.accidentsService
      .getFilteredAccidents({date: dateString})
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

  updateFilter(event: any) {
    let selectedDate = event.target.value;
    return this.getAccidentsByDate(selectedDate);
  }

  onSelectAccident(selectedAccident: Accident) {
    this.selectedAccident = selectedAccident;
  }
}
