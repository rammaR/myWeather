import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { HomeReducer } from './state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from './state/home.effect';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { HomePage } from './containers/home/home.page';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('home', HomeReducer),
    EffectsModule.forFeature([HomeEffect]),
    BookmarksModule
  ],
  declarations: [
    HomePage,
    CurrentWeatherComponent
  ]
})
export class HomeModule { }
