import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetailsPage } from './containers/details/details.page';
import { DetailsGuard } from './services/details.guard.service';
import { DailyWeatherComponent } from './containers/components/daily-weather/daily-weather.component';
import { DetailsWeaterComponent } from 'src/app/shared/components/details-weather/details-weater/details-weater.component';
import { StoreModule } from '@ngrx/store';
import { detailsReducer } from './state/details.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DetailsEffects } from './state/details.effects';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DetailsPage, canActivate: [DetailsGuard] }
    ]),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    ComponentsModule
  ],
  declarations: [
    DetailsPage,
    DailyWeatherComponent,
  ],  
  providers: [
    DetailsGuard
  ]
})
export class DetailsModule { }
