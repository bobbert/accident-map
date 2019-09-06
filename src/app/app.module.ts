import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { MapPanelComponent } from './map-panel/map-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsPanelComponent,
    MapPanelComponent
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
