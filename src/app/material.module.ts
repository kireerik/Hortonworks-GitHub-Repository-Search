import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule, MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule, MatInputModule
  ]
})
export class MaterialModule { }
