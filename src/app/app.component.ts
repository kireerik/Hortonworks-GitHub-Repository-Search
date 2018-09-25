import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hortonworks-GitHub-Repository-Search';

  apiUrl = 'https://api.github.com/search/repositories?q=';

  myControl = new FormControl();
  filteredOptions: string[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.myControl.valueChanges.subscribe(value =>
      this.http.get<any>(this.apiUrl + value).subscribe(data =>
        this.filteredOptions = data.items.map(({full_name}) => full_name)
      )
    );
  }
}
