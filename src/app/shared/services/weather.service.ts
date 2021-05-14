import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CityDailyWeather, CityWeather, ContainerCityWeather } from '../models/weather.model';
import { responseToCityDailyWeather, responseToCityWeather } from '../utils/response.utils';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityWeatherByQuery(query: string): Observable<CityWeather> {
    const params = new HttpParams({ fromObject: { q: query } });

    return this.doGet<any>('weather', params).pipe(map(response => responseToCityWeather(response)))
  }

  getCitiesByCoord(lat: number, lon: number, cnt: number = 5): Observable<CityWeather[]> {
    //reference
    //api.openweathermap.org/data/2.5/find?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString(),
        cnt: cnt.toString(),
        appid: environment.WHEATER_API_KEY,
        lang: 'pt_br',
        units: 'metric'
      }
    })

    return this.http.get<ContainerCityWeather>('https://api.openweathermap.org/data/2.5/find', { params }).pipe(
      map((value: ContainerCityWeather) => {
        let list: CityWeather[] = [];
        value.list.forEach((cityWheater) => {
          list.push(responseToCityWeather(cityWheater));
        })
        return list;
      })
    );
  }

  getCityWeatherByCoord(lat: number, lon: number): Observable<CityWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString()
      }
    })

    return this.doGet('weather', params).pipe(
      map(response => responseToCityWeather(response))
    )
  }

  getWeatherDetails(lat: number, lon: number): Observable<CityDailyWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString(),
        exclude: 'minutely, hourly'
      }
    })

    return this.doGet('onecall', params).pipe(
      map(response => responseToCityDailyWeather(response))
    )
  }

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    //console.warn('API KEY', environment.APIKEY);

    params = params.append('appid', environment.WHEATER_API_KEY);
    params = params.append('lang', 'pt_br');

    return this.http.get<T>('https://api.openweathermap.org/data/2.5/' + url, { params });
  }

}
