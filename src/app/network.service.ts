import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  get = <Type>(apiUrl, name, handle) =>
    new Observable(observer =>
      this.http.get<Type>(apiUrl + name).subscribe(data => handle(observer, data)
      , error => {
        if (error.status === 403 && error.error.documentation_url === 'https://developer.github.com/v3/#rate-limiting') {
          const retryTimeout = error.headers.get('X-RateLimit-Reset') - Math.round(Date.now() / 1000);

          observer.error(retryTimeout);
        }
      })
    )
}
