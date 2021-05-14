import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { appReducer, MyState } from './app.reducer';
import { RouterState } from './router/router.reducer';

export interface AppState {
    router: RouterState,
    state: MyState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    state: appReducer
}

