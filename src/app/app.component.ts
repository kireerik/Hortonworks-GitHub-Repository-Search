import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

interface Item {
  full_name: string
}

interface Repository {
  items: Array<Item>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hortonworks-GitHub-Repository-Search';

  apiUrl = 'https://api.github.com/search/repositories?q=';

  name = new FormControl();
  filteredOptions: string[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.name.valueChanges.subscribe(value =>
      this.http.get<Repository>(this.apiUrl + value).subscribe(data =>
        this.filteredOptions = data.items.map(({full_name}) => full_name)
      )
    );
  }
}
