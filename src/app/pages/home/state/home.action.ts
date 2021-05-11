import { createAction, props } from "@ngrx/store";
import { Bookmark } from "src/app/shared/models/bookmark.model";

export const clearHomeState = createAction(
    '[Home] Clear State'
)

export const loadCurrentWeather = createAction(
    '[Weather API] Load current weather',
    props<{ query: string }>()
)

export const loadCurrentWeatherSuccess = createAction(
    '[Weather API] Load current weather success',
    props<{ entity: any }>()
)

export const loadCurrentWeatherFail = createAction(
    '[Weather API] Load Current Weather Failed',
)

export const toggleBookmark = createAction(
    '[Home] Toggle Bookmark',
    props<{ entity: Bookmark }>()
)

export const favoritedBookmark = createAction(
    '[Home] Is favorited bookmark',
    props<{ entity: Bookmark }>()
)