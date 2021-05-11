import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksPage } from './containers/bookmarks.page';
import { StoreModule } from '@ngrx/store';
import { bookmarkReducer } from './state/bookmark.reducer';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BookmarksPage,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
  ]
})
export class BookmarksModule { }
