import { Component, OnInit } from '@angular/core';

import { AccidentsService } from './accidents.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'accident-map';
  accidentsByDate: any[] = [];
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
      this.accidentDates = (res as any).data;
      this.getAccidentsByDate(this.accidentDates[0]);
    });
  }

  getAccidentsByDate(dateString: any) {
    return this.accidentsService.getByDate(dateString).subscribe(res => {
      this.accidentsByDate = (res as any).data;
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
