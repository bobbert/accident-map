import { Component, OnInit } from '@angular/core';

import { AccidentsService } from './accidents.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'accident-map';
  accidentsByDate: any[] = [];

  constructor(private as: AccidentsService) { }

  ngOnInit() {
    console.log('Initializing map.');
    // TODO: populate dropdown and initialize based on dropdown default
    this.getAccidentsByDate('12/31/16');
  }

  getAccidentsByDate(dateString) {
    this.as.getByDate(dateString).subscribe(res => {
      this.accidentsByDate = (res as any).data;
    });
  }
}
