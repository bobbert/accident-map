import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.sass']
})
export class MapPanelComponent implements OnInit {
  lat = 39.183917;
  lng = -76.805643;

  constructor() {
  }

  ngOnInit() {
  }

}
