import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Accident } from './accident';

@Injectable({
  providedIn: 'root'
})
export class AccidentsService {
  //Injectable hardcode URL to point to localhost.  Local is currently the only
  // environment; if this app were actually deployed this would have to change.
  accidentsEndpoint = 'http://localhost:3000/accidents.json';
  accidentDatesEndpoint = 'http://localhost:3000/accident-dates.json';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Accident[]> {
    return this.http.get<Accident[]>(this.accidentsEndpoint);
  }

  getDates(): Observable<string[]> {
    return this.http.get<string[]>(this.accidentDatesEndpoint);
  }

  getByDate(dateString: string): Observable<Accident[]> {
    let params = new HttpParams().set("date", dateString);
    return this.http.get<Accident[]>(this.accidentsEndpoint, { params });
  }
}
