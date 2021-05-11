import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksPage } from './pages/bookmarks/containers/bookmarks.page';
import { DetailsModule } from './pages/details/details.module';
import { HomePage } from './pages/home/containers/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'bookmarks',
    component: BookmarksPage
  },
  {
    path: 'details',
    loadChildren: ()=>import('./pages/details/details.module').then(m => DetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }