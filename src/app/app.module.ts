import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';

import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MapPanelComponent,
    DetailsPanelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8JxzIChVrQJLgS6RRcbx175EU2K8yQgs'
    })
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/app'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
