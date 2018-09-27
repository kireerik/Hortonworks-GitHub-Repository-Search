import {NgModule} from '@angular/core';

import {
  MatAutocompleteModule, MatInputModule
  , MatProgressSpinnerModule

  , MatCardModule, MatListModule, MatGridListModule
  , MatIconModule, MatBadgeModule, MatTooltipModule

  , MatTableModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule, MatInputModule
    , MatProgressSpinnerModule

    , MatCardModule, MatListModule, MatGridListModule
    , MatIconModule, MatBadgeModule, MatTooltipModule

    , MatTableModule
  ]
})
export class MaterialModule {}
