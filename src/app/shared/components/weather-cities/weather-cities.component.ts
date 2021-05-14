import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../shared/services/weather.service';
import { CityWeather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-cities',
  templateUrl: './weather-cities.component.html',
  styleUrls: ['./weather-cities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCitiesComponent implements OnInit {

  cities: CityWeather[];

  constructor(
    private service: WeatherService,
    private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    //this.getCities();
  }

  getCities(lat: number, lon: number, cnt: number = 15) {
    this.service.getCitiesByCoord(lat, lon, cnt).subscribe(
      (list) => {
        this.cities = list;
        this.changeDetection.detectChanges();
        console.log("Cities List", this.cities);
      }
    );
  }

}
