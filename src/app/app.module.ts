import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarksModule } from './pages/bookmarks/bookmarks.module';
import { HomeModule } from './pages/home/home.module';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './shared/state/app.state';
import { CustomRouterSerializer } from './shared/state/router/router.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BookmarksModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({serializer: CustomRouterSerializer}),
    EffectsModule.forRoot([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
