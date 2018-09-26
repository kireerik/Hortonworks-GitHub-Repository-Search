import {NgModule} from '@angular/core';

import {
  MatAutocompleteModule, MatInputModule
  , MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule, MatInputModule
    , MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
