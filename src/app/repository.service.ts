import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
      )
    );
  }
}
