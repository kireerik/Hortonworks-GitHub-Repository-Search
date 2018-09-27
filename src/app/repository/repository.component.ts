import {Component, OnChanges, Input} from '@angular/core';

import {RepositoryIssueService} from './repository-issue.service';

import {getLoadingIndicatorDefaultValues, load} from '../shared/load';

@Component({
  selector: 'app-repository'
  , templateUrl: './repository.component.html'
  , styleUrls: ['../shared/styles.css']
})
export class RepositoryComponent implements OnChanges {
  displayedColumns = ['number', 'title', 'state'];

  @Input() repository;

  subscribtion;

  repositoryIssuesLoadingIndicator = getLoadingIndicatorDefaultValues();

  constructor(private repositoryIssueService: RepositoryIssueService) {}

  dataSource;

  ngOnChanges(changes) {
    if (!changes.repository.firstChange) {
      load(this.subscribtion, this.repositoryIssuesLoadingIndicator
        , this.repositoryIssueService.getIssues, changes.repository.currentValue.full_name
        , issues => this.dataSource = issues
      );
    }
  }
}
