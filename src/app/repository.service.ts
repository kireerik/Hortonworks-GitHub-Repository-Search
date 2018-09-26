import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

interface Item {
  full_name: string;
}

interface Repository {
  items: Array<Item>;
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  apiUrl = 'https://api.github.com/search/repositories?q=';

  constructor(private http: HttpClient) {}

  getRepositories(name: string) {
    return new Observable(observer =>
      this.http.get<Repository>(this.apiUrl + name).subscribe(data =>
        observer.next(data.items.map(({full_name}) => full_name))
      , error => {
        if (error.status === 403 && error.error.documentation_url === 'https://developer.github.com/v3/#rate-limiting') {
          const retryTimeout = error.headers.get('X-RateLimit-Reset') - Math.round(Date.now() / 1000);

          observer.error(retryTimeout);
        }
      })
    );
  }
}
