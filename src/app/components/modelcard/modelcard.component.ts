import { Component } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-modelcard',
  templateUrl: './modelcard.component.html',
  styleUrls: ['./modelcard.component.css']
})
export class ModelcardComponent {
  provider: string = 'OPENAI'

  constructor(private stateService: StateService) {
    this.stateService.provider$.subscribe(provider => this.provider = provider);
  }
}
