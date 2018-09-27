import {Injectable} from '@angular/core';

import {NetworkService} from './network.service';

interface Repository {
  full_name: string;

  html_url: string;
  description: string;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
}

interface Repositories {
  items: Array<Repository>;
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  apiUrl = 'https://api.github.com/search/repositories?q=';

  repositories: Array<Repository>;

  constructor(private networkService: NetworkService) {}

  getRepositories = name =>
    this.networkService.get<Repositories>(this.apiUrl, name, (observer, data) => {
      this.repositories = data.items.map(({
        full_name
        , html_url, description, forks_count, stargazers_count, open_issues_count
      }) => ({
        full_name
        , html_url, description, forks_count, stargazers_count, open_issues_count
      }));

      observer.next(this.repositories.map(({full_name}) => full_name));
    })

  getRepository = name =>
    this.repositories.find(repository => repository.full_name === name)
}
