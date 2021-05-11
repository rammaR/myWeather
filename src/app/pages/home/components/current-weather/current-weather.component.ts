import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent implements OnInit {

  @Input() cityWeather: CityWeather;
  @Input() isFavorite: boolean = false;
  @Output() onToggleBookmark: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  get city() {
    return this.cityWeather.city;
  }

  get cityName(): string {
    return this.city.name + ', ' + this.city.country;
  }

  toggleBookmark() {
    this.onToggleBookmark.emit('');
  }

}
