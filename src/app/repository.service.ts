import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

export interface Repository {
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

  constructor(private http: HttpClient) {}

  getRepositories(name: string) {
    return new Observable(observer =>
      this.http.get<Repositories>(this.apiUrl + name).subscribe(data => {
        observer.next(data.items.map(({full_name}) => full_name));

        this.repositories = data.items;
      }
      , error => {
        if (error.status === 403 && error.error.documentation_url === 'https://developer.github.com/v3/#rate-limiting') {
          const retryTimeout = error.headers.get('X-RateLimit-Reset') - Math.round(Date.now() / 1000);

          observer.error(retryTimeout);
        }
      })
    );
  }

  getRepository(name: string) {
    return this.repositories.find(repository => repository.full_name === name);
  }
}
