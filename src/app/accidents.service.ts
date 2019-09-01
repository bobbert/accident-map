import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccidentsService {

  // hardcode URL to point to localhost.  Local is currently the only
  // environment; if this app were actually deployed this would have to change.
  accidentsEndpoint = 'http://localhost:3000/accidents.json';
  accidentDatesEndpoint = 'http://localhost:3000/accident-dates.json';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.accidentsEndpoint);
  }

  getDates() {
    return this.http.get(this.accidentDatesEndpoint);
  }

  getByDate(dateString) {
    let params = new HttpParams().set("date", dateString);
    return this.http.get(this.accidentsEndpoint, { params });
  }

}
