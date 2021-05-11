import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HomeState } from "./home.reducer";

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectCurrentWeather = createSelector(
    selectHomeState,
    (state: HomeState) => state.entity
)

export const selectCurrentWeatherLoading = createSelector(
    selectHomeState,
    (state: HomeState) => state.loading
)

export const selectCurrentWheaterError = createSelector(
    selectHomeState,
    (state: HomeState) => state.error
)