import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getIssues(repositoryName: string) {
    return new Observable(observer =>
      this.http.get<Issues>(this.apiUrl + repositoryName).subscribe(data =>
        observer.next(data.items.map(({number, title, state}) => ({
          number, title, state
        })))
      , error => {
        if (error.status === 403 && error.error.documentation_url === 'https://developer.github.com/v3/#rate-limiting') {
          const retryTimeout = error.headers.get('X-RateLimit-Reset') - Math.round(Date.now() / 1000);

          observer.error(retryTimeout);
        }
      })
    );
  }
}
