import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookmarkState } from "./bookmark.reducer";

export const selectBookmarkState = createFeatureSelector('bookmarks');

export const selectBookmarkList = createSelector(
    selectBookmarkState,
    (state: BookmarkState) => state.list
)