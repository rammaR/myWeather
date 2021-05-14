import { createReducer, on } from "@ngrx/store";
import * as fromAppAction from "./app.action";

export interface MyState {
    googleMapsReady: boolean
}

export const initialState: MyState = {
    googleMapsReady: false
}

const _appReducer = createReducer(
    initialState,
    on(fromAppAction.googleMapsReady, state => ({
        ...state,
        googleMapsReady: true
    })),
    on(fromAppAction.googleMapsNotReady, state => ({
        ...state,
        googleMapsReady: false
    }))
)

export function appReducer(state, action) {
    return _appReducer(state, action);
}