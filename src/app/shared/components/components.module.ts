import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapComponent } from './google-map/google-map.component';
import { WeatherCitiesComponent } from './weather-cities/weather-cities.component';
import { DetailsWeaterComponent } from './details-weather/details-weater/details-weater.component';

@NgModule({
  declarations: [
    GoogleMapComponent,
    WeatherCitiesComponent,
    DetailsWeaterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GoogleMapComponent,
    WeatherCitiesComponent,
    DetailsWeaterComponent
  ]
})
export class ComponentsModule { }
