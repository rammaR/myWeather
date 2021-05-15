import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';

import { GoogleMapShape } from './google-map-shape';
import { GoogleMapPolygon } from './google-map-polygon';
import { GoogleMapCircle } from './google-map-circle';
import { GoogleMapHelper, CustomDraw, DRAW_TYPE } from './google-map-helper';

enum ZOOM_OPTIONS {
  World = 1,
  Continent = 5,
  City = 10,
  Street = 15,
  Buildings = 20
}

@Component({
  selector: 'app-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements AfterViewInit {

  private readonly campinas: google.maps.LatLngLiteral = { lat: -22.917293, lng: -47.065733 }

  @Input() width: string;
  @Input() height: string;
  @Input() customDraw: CustomDraw;
  @Input() locations: google.maps.LatLng[];
  @Output() drawSaved: EventEmitter<CustomDraw> = new EventEmitter<CustomDraw>();
  @Output() onSetMark: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
  //
  private _disabled: boolean = true;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(param: boolean) {
    this._disabled = param;
  }

  private marker: google.maps.Marker;
  private map: google.maps.Map;
  private MAP_ID: string = 'GoogleMapReference';
  private shape: GoogleMapShape;
  private markes: google.maps.Marker[];
  readonly: boolean = true;

  constructor() {
    this.width = '800px';
    this.height = '600px';
    this.locations = [];
    this.markes = [];
  }

  ngAfterViewInit() {
    let mapOptions: google.maps.MapOptions = {
      zoom: ZOOM_OPTIONS.City,
      //mapTypeId: 'satellite',
      fullscreenControl: false,
      disableDefaultUI: true,
    }

    this.map = new google.maps.Map(document.getElementById(this.MAP_ID), mapOptions);

    this.map.setCenter(this.campinas);

    if (this.map) {
    } else {
      alert('map not found');
    }

    if (this.customDraw) {
      this.loadDraw(this.customDraw);
    }

    if ((this.locations) && (this.locations.length > 0)) {
      this.loadMarkers();
      this.loadClusters();
    }

    this.setClickEvent();
  }

  setClickEvent() {
    this.map.addListener("click", (e) => {
      this.setMark(e.latLng);
    });
  }

  setMark(latLng: google.maps.LatLng) {
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    this.map.panTo(latLng);
    //alert('new emitted');
    this.onSetMark.emit(latLng);
  }

  private loadMarkers() {
    this.locations.map((location) => {
      this.markes.push(GoogleMapHelper.addPosition(this.map, location));
    });
  }

  private loadClusters() {
    //@ts-ignore
    new MarkerClusterer(this.map, this.markes, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
  }

  private loadDraw(draw: CustomDraw) {
    this.shape = null;

    switch (draw.type) {
      case DRAW_TYPE.POLYGON: this.shape = new GoogleMapPolygon(); break;
      case DRAW_TYPE.CIRCLE: this.shape = new GoogleMapCircle(); break;
    }

    if (this.shape) {
      this.map.setZoom(draw.zoom);
      this.shape.load(this.map, draw);
    }
  }

  private drawArea = () => {
    if (this.shape) this.shape.delete(this.map);
    this.shape = new GoogleMapPolygon();
    this.draw();
  }

  private drawCircle = () => {
    if (this.shape) this.shape.delete(this.map);
    this.shape = new GoogleMapCircle();
    this.draw();
  }

  private drawCancel = () => {
    if (!this.readonly) {
      this.shape.cancel();
      this.readonly = true;
    }
  }

  private drawSave = () => {
    let custom = this.shape.save(this.map);

    if (custom) {
      this.drawSaved.emit(custom as CustomDraw);
    }

    this.readonly = true;
  }

  private drawDelete = () => {
    if (this.shape.delete(this.map)) {
      this.drawSaved.emit(null);
      this.readonly = true;
    }
  }

  private draw() {
    if (this.shape.init(this.map)) {
      this.readonly = false;
    }
  }
}