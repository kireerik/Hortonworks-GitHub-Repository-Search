import { Component, Input } from '@angular/core';

import {Repository} from './repository.service';

@Component({
  selector: 'app-repository'
  , templateUrl: './repository.component.html'
})
export class RepositoryComponent {
  @Input() repository: Repository;
}
