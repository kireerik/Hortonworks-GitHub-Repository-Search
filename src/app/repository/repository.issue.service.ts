import {Injectable} from '@angular/core';

import {NetworkService} from '../shared/network.service';

interface Issue {
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

  constructor(private networkService: NetworkService) {}

  getIssues = repositoryName =>
    this.networkService.get<Issues>(this.apiUrl, repositoryName, (observer, data) =>
      observer.next(data.items.map(({number, title, state}) => ({
        number, title, state
      })))
    )
}
