import {TestBed, async} from '@angular/core/testing';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from '../material.module';

import {AppComponent} from './app.component';
import {RepositoryComponent} from '../repository/repository.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    expect(
      TestBed.createComponent(AppComponent)
        .debugElement.componentInstance
    ).toBeTruthy();
  }));

  const title = 'Hortonworks GitHub Repository Search'

  it(`should render '` + title + `' as title in a h1 tag`, async(() => {
    expect(
      TestBed.createComponent(AppComponent)
        .debugElement.nativeElement
          .querySelector('h1').textContent
    ).toContain(title);
  }));
});
