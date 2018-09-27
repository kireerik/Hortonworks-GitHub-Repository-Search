import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {RepositoryService} from './repository.service';

import {getLoadingIndicatorDefaultValues, load} from './load';

@Component({
  selector: 'app-root'
  , templateUrl: './app.component.html'
  , styleUrls: ['./styles.css', './app.component.css']
})
export class AppComponent implements OnInit {
  name = new FormControl();
  filteredOptions;

  constructor(private repositoryService: RepositoryService) {}

  subscribtion;

  repositoryNamesLoadingIndicator = getLoadingIndicatorDefaultValues();

  repository;

  onRepositoryNameChanged = event =>
    this.repository = this.repositoryService.getRepository(event.option.value)

  ngOnInit() {

    this.name.valueChanges.subscribe(value => {
      if (value) {
        load(this.subscribtion, this.repositoryNamesLoadingIndicator
          , this.repositoryService.getRepositories, value
          , repositoryNames => this.filteredOptions = repositoryNames
        );
      }
    });
  }
}
