import {Injectable} from '@angular/core';

import {NetworkService} from './network.service';

export interface Issue {
  number: number;
  title: string;
  state: string;
}

interface Issues {
  items: Array<Issue>;
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryIssueService {
  apiUrl = 'https://api.github.com/search/issues?q=repo:';

  issues: Array<Issue>;

  constructor(private networkService: NetworkService) {}

  getIssues = repositoryName =>
    this.networkService.get<Issues>(this.apiUrl, repositoryName, (observer, data) =>
      observer.next(data.items.map(({number, title, state}) => ({
        number, title, state
      })))
    )
}
