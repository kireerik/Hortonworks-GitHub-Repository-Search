import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RepositoryService } from './repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hortonworks-GitHub-Repository-Search';

  name = new FormControl();
  filteredOptions: string[];

  constructor(private repositoryService: RepositoryService) {}

  ngOnInit() {
    this.name.valueChanges.subscribe(value =>
      this.repositoryService.getRepositories(value).subscribe(data =>
        this.filteredOptions = data.items.map(({full_name}) => full_name)
      )
    );
  }
}
