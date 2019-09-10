import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Accident } from './accident';
import { FilterOptions } from './filter-options';

// TODO: move to util class?
function isEmpty(value: any) {
  return ((value == null) || (value.length === 0));
}

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

  getFilteredAccidents(filterOptions: FilterOptions): Observable<Accident[]> {
    let params = new HttpParams();

    if (!isEmpty(filterOptions.date)) {
      params = params.set("date", filterOptions.date);
    }
    if (!isEmpty(filterOptions.agencyName)) {
      params = params.set("agencyName", filterOptions.agencyName);
    }
    if (!isEmpty(filterOptions.reportType)) {
      params = params.set("reportType", filterOptions.reportType);
    }
    if (!isEmpty(filterOptions.make)) {
      params = params.set("make", filterOptions.make);
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
