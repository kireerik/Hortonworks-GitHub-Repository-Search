import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import {Repository} from './repository.service';

import {animate} from './animate';

import {Issue, RepositoryIssueService} from './repositoryIssue.service';

let subscribtion;

@Component({
  selector: 'app-repository'
  , templateUrl: './repository.component.html'
  , styleUrls: ['./styles.css']
})
export class RepositoryComponent implements OnChanges {
  @Input() repository: Repository;

  repositoryIssuesLoadingIndicator = {
    show: false
    , color: 'primary'
    , mode: 'indeterminate'
    , value: null
  };

  constructor(private repositoryIssueService: RepositoryIssueService) {}

  displayedColumns: string[] = ['number', 'title', 'state'];
  dataSource: Issue[];

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.repository.firstChange) {
      this.repositoryIssuesLoadingIndicator.show = true;

      const getIssues = () => {
        if (subscribtion) {
          subscribtion.unsubscribe();
        }

        subscribtion = this.repositoryIssueService.getIssues(changes.repository.currentValue.full_name).subscribe((issues: Issue[]) => {
          this.dataSource = issues;

          this.repositoryIssuesLoadingIndicator.show = false;
        }
        , retryTimeout => {
          this.repositoryIssuesLoadingIndicator.color = 'warn';
          this.repositoryIssuesLoadingIndicator.mode = 'determinate';
          this.repositoryIssuesLoadingIndicator.value = 100;

          animate(progress => {
            this.repositoryIssuesLoadingIndicator.value = Math.round(100 - 100 * progress);
          }, retryTimeout * 1000, () => {
            this.repositoryIssuesLoadingIndicator.color = 'primary';
            this.repositoryIssuesLoadingIndicator.mode = 'indeterminate';
            getIssues();
          });
        });
      };

      getIssues();
    }
  }
}
