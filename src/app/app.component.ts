import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AccidentsService } from './accidents.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'accident-map';
  accidentsByDate: any[] = [];

  constructor(private as: AccidentsService) { }

  getAccidentsByDate(dateString) {
    this.as.getByDate(dateString).subscribe(res => {
      this.accidentsByDate = (res as any).data;
    });
  }
}
