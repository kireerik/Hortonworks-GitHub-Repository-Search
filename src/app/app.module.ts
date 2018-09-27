import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './material.module';

import {AppComponent} from './app.component';
import {RepositoryComponent} from './repository/repository.component';

@NgModule({
  declarations: [
    AppComponent
    , RepositoryComponent
  ]
  , imports: [
    BrowserModule
    , BrowserAnimationsModule
    , FormsModule
    , ReactiveFormsModule
    , HttpClientModule
    , MaterialModule
  ]
  , providers: []
  , bootstrap: [AppComponent]
})
export class AppModule {}
