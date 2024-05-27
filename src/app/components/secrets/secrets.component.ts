import { Component, Input } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent {
  apiKey?: string;
  passwordVisible = false;
  provider: string = 'OpenAI';
  @Input() selectedProvider: string = 'OpenAI';

  constructor(private stateService: StateService){
    this.stateService.provider$.subscribe(provider => this.provider = provider.toUpperCase());
    this.stateService.apiKey$.subscribe(apiKey => this.apiKey = apiKey);
  }

  changeAPIKey(newAPIKey: string){
    this.apiKey = newAPIKey;
    this.stateService.setApiKey(this.apiKey);
  }
}
