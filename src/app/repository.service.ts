import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Repository>(this.apiUrl + name);
  }
}
