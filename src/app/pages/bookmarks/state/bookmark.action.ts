import { createAction, props } from "@ngrx/store";

export const removeBookmark = createAction(
    '[Bookmark] Remove bookmark',
    props<{ id: number }>()
)