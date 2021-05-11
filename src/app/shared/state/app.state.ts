import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RouterState } from './router/router.reducer';

export interface AppState {
    router: RouterState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
}

