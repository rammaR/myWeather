import { createSelector } from "@ngrx/store";
import { MyState } from "./app.reducer";
import { AppState } from "./app.state";

export const selectMyState = (state: AppState) => state.state;

export const selectGoogleMapsReady = createSelector(
    selectMyState,
    (state: MyState) => state.googleMapsReady
)