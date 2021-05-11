import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import * as fromBookmarksSelectors from '../state/bookmark.selector';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit {

  bookmarks$: Observable<Bookmark[]>;

  constructor(private store: Store) { 
    this.bookmarks$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarkList));
  }

  ngOnInit(): void {
    
  }

  removeBookmark(id){
    
  }

}
