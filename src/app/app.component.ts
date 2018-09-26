import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RepositoryService } from './repository.service';

import { animate } from './animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hortonworks-GitHub-Repository-Search';

  name = new FormControl();
  filteredOptions: string[];

  repositoryNamesLoadingIndicator = {
    show: false
    , color: 'primary'
    , mode: 'indeterminate'
    , value: null
  };

  constructor(private repositoryService: RepositoryService) {}

  ngOnInit() {
    let subscribtion;

    this.name.valueChanges.subscribe(value => {
      if (value) {
        this.repositoryNamesLoadingIndicator.show = true;

        const getRepositories = () => {
          if (subscribtion) {
            subscribtion.unsubscribe();
          }

          subscribtion = this.repositoryService.getRepositories(value).subscribe((repositoryNames: string[]) => {
            this.filteredOptions = repositoryNames;

            this.repositoryNamesLoadingIndicator.show = false;
          }
          , retryTimeout => {
            this.repositoryNamesLoadingIndicator.color = 'warn';
            this.repositoryNamesLoadingIndicator.mode = 'determinate';
            this.repositoryNamesLoadingIndicator.value = 100;

            animate(progress => {
              this.repositoryNamesLoadingIndicator.value = Math.round(100 - 100 * progress);
            }, retryTimeout * 1000, () => {
              this.repositoryNamesLoadingIndicator.color = 'primary';
              this.repositoryNamesLoadingIndicator.mode = 'indeterminate';
              getRepositories();
            });
          });
        };

        getRepositories();
      }
    });
  }
}
