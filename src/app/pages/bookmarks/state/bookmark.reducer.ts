import { Action, createReducer, on } from "@ngrx/store"
import { Bookmark } from "src/app/shared/models/bookmark.model"
import * as fromHomeActions from "src/app/pages/home/state/home.action";
import * as fromBookmarkActions from "src/app/pages/bookmarks/state/bookmark.action";

export interface BookmarkState {
    list: Bookmark[];
}

export const bookmarkInitialState: BookmarkState = {
    list: []
}

const reducer = createReducer(
    bookmarkInitialState,
    on(fromHomeActions.toggleBookmark, (state, { entity }) => ({
        ...state,
        list: toggleBookmark(state.list, entity)
    })),
    on(fromBookmarkActions.removeBookmark, (state, { id }) => ({
        ...state,
        list: state.list.filter(b => b.id !== id)
    }))
)

export function bookmarkReducer(state: BookmarkState | undefined, action: Action) {
    return reducer(state, action);
}

export function toggleBookmark(list: Bookmark[], entity: Bookmark): Bookmark[] {
    if (!!list.find(b => b.id === entity.id)) {
        return list.filter(b => b.id !== entity.id)
    }
    return [
        ...list,
        entity
    ]
}