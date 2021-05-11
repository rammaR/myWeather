import { Component, Input } from '@angular/core';
import { Weather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-details-weater',
  templateUrl: './details-weater.component.html',
  styleUrls: ['./details-weater.component.scss']
})
export class DetailsWeaterComponent {

  @Input() weather: Weather;

  get weatherIcon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }

}
