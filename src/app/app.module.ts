import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ResultsPanelComponent } from './results-panel/results-panel.component';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsPanelComponent,
    MapPanelComponent,
    FilterPanelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8JxzIChVrQJLgS6RRcbx175EU2K8yQgs'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
