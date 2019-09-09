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
  accidentDatesEndpoint = 'http://localhost:3000/accident-date-list.json';
  accidentTypesEndpoint = 'http://localhost:3000/accident-type-list.json';
  agencyNamesEndpoint = 'http://localhost:3000/agency-name-list.json';
  carMakesEndpoint = 'http://localhost:3000/car-make-list.json';

  
  constructor(private http: HttpClient) { }

  getFilteredAccidents(filterOptions: Object = {}): Observable<Accident[]> {
    let params = new HttpParams();
    for (let [key, value] of Object.entries(filterOptions)) {
      params = params.set(key, value);
    }

    return this.http.get<Accident[]>(this.accidentsEndpoint, { params });
  }

  getDates(): Observable<string[]> {
    return this.http.get<string[]>(this.accidentDatesEndpoint);
  }

  getAccidentTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.accidentTypesEndpoint);
  }

  getAgencyNames(): Observable<string[]> {
    return this.http.get<string[]>(this.agencyNamesEndpoint);
  }

  getCarMakes(): Observable<string[]> {
    return this.http.get<string[]>(this.carMakesEndpoint);
  }

}
