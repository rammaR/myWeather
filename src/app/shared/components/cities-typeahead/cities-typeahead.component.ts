import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CityTypeaheadItem } from '../../models/city-typeahead-item.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.css']
})
export class CitiesTypeaheadComponent implements OnInit {

  search: string;
  suggestions$: Observable<string>;
  dataSource$: Observable<CityTypeaheadItem[]>;

  constructor(private service: CitiesService) { }

  ngOnInit(): void {
    this.dataSource$ = new Observable(
      (subs: Subscriber<string>) => {
        subs.next(this.search)
      }
    ).pipe(
      switchMap(
        ((query:string) => {
          this.service.getCities(query)
        })
      )
    )
  }

}
