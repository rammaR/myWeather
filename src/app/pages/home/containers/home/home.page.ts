import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { City, CityWeather } from 'src/app/shared/models/weather.model';
import * as fromHomeActions from '../../state/home.action';
import * as fromHomeSelectors from '../../state/home.selector';
import * as fromBookmarkSelectors from '../../../bookmarks/state/bookmark.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  search: FormControl = new FormControl('Campinas', Validators.required);
  cityWeatehrSubs: Subscription;
  cityWeather: CityWeather;
  cityWeather$: Observable<CityWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  bookmarks$: Observable<Bookmark[]>;
  isFavorited$: Observable<boolean>;

  constructor(private store: Store) {
    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWheaterError));
    this.bookmarks$ = this.store.pipe(select(fromBookmarkSelectors.selectBookmarkList))
    this.cityWeatehrSubs = this.cityWeather$.subscribe(value => this.cityWeather = value);
    this.isFavorited$ = combineLatest([this.cityWeather$, this.bookmarks$]).pipe(
      map(
        ([thisCity, bookList]) => {
          console.log('espiao');
          
          return bookList.some(book => book.id === thisCity?.city?.id)
        })
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.cityWeatehrSubs.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
  }

  doSearch() {
    const query = this.search.value;
    console.warn('Searching', query);
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }

  onToggleBookmark() {
    const book = new Bookmark;
    book.id = this.city.id;
    book.name = this.city.name;
    book.country = this.city.country;
    book.coord = this.city.coord;

    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: book }));
  }

  get city(): City {
    return this.cityWeather.city;
  }
}
