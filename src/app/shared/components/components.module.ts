import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';

import { CitiesTypeaheadComponent } from './cities-typeahead/cities-typeahead.component';

@NgModule({
  declarations: [
    CitiesTypeaheadComponent,
    FormsModule,
    TypeaheadModule
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CitiesTypeaheadComponent
  ]
})
export class ComponentsModule { }
