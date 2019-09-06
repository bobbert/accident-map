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
  selectedAccidentId: string = null;

  constructor(private accidentsService: AccidentsService) { }

  ngOnInit() {
    console.log('Initializing map.');
    // TODO: populate dropdown and initialize based on dropdown default
    this.getDates();
  }

  getDates() {
    return this.accidentsService.getDates().subscribe(res => {
      console.log('Accident Dates: ', res);
      this.accidentDates = res;
      this.getAccidentsByDate(this.accidentDates[0]);
    });
  }

  getAccidentsByDate(dateString: string) {
    return this.accidentsService.getByDate(dateString).subscribe((res: Accident[]) => {
      console.log('Accidents: ', res);
      this.accidentsByDate = res;
      this.selectedAccidentId = null;
    });
  }

  updateFilter(event: any) {
    let selectedDate = event.target.value;
    return this.getAccidentsByDate(selectedDate);
  }

  onSelectAccident(event: any) {
    console.log('onSelectAccident: ', event);
    this.selectedAccidentId = event.selectedAccidentId;
  }
}
