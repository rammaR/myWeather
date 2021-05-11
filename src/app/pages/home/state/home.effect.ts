import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WeatherService } from "src/app/shared/services/weather.service";

import * as fromHomeActions from './home.action';

@Injectable()
export class HomeEffect {

    loadCurrentWeather$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromHomeActions.loadCurrentWeather),
            mergeMap(({ query }) => this.service.getCityWeatherByQuery(query)),
            catchError((err, caught$) => {
                this.store.dispatch(fromHomeActions.loadCurrentWeatherFail())
                console.log("Error on loadCurrentWeatehr", err);
                return caught$;
            }),
            map((entity: any) => fromHomeActions.loadCurrentWeatherSuccess({ entity }))
        )
    )

    constructor(
        private actions$: Actions,
        private store: Store,
        private service: WeatherService) {

    }

}