import { Component, Input } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  temperature = 0.7;
  maxTokens = 1000;
  topP = 1;
  frequencyPenalty = 0.43;
  topK = 32;
  @Input() selectedProvider: string = 'openai';
  options: any = {
    'openai': [
      { value: 'Temperature', max: 2.0, min: 0.0, variable: this.temperature, step: 0.1, description: 'Sampling temperature to use' },
      { value: 'Max Tokens', max: 4096, min: 0,  variable: this.maxTokens, step: 1, description: 'Maximum number of tokens to generate in the completion.' },
      { value: 'Top P', max: 1, min: 0, variable: this.topP, step: 0.1, description: 'Total probability mass of tokens to consider at each step.'  },
      { value: 'Frequency Penalty', max: 1, min: 0, variable: this.frequencyPenalty, step: 0.1, description: 'Penalizes repeated tokens according to frequency.' }
    ],
    'google': [
      { value: 'Temperature', max: 1.0, min: 0.0, variable: this.temperature, step: 0.1, description: 'Sampling temperature to use' },
      { value: 'Max Tokens', max: 4096, min: 0,  variable: this.maxTokens, step: 1, description: 'Maximum number of tokens to generate in the completion.' },
      { value: 'Top P', max: 1, min: 0, variable: this.topP, step: 0.1, description: 'Total probability mass of tokens to consider at each step.'  },
      { value: 'Top K', max: 64, min: 0, variable: this.topK, step: 1, description: 'Changes how the model selects tokens for output.' }
    ],
    'anthropic': [
      { value: 'Temperature', max: 1.0, min: 0.0, variable: this.temperature, step: 0.1, description: 'Sampling temperature to use' },
      { value: 'Max Tokens', max: 4096, min: 0,  variable: this.maxTokens, step: 1, description: 'Maximum number of tokens to generate in the completion.' },
      { value: 'Top P', max: 1, min: 0, variable: this.topP, step: 0.1, description: 'Total probability mass of tokens to consider at each step.'  },
      { value: 'Top K', max: 64, min: 0, variable: this.topK, step: 1, description: 'Changes how the model selects tokens for output.' }
    ],
  };

  constructor(private stateService: StateService){}

  changeOptions(newValue: number, variable: string){
    switch(variable){
      case 'Temperature': this.temperature = newValue;
      console.log("inside temperature", this.temperature)
      this.stateService.setTemperature(this.temperature);
      break;
      case 'Max Tokens': this.maxTokens = newValue; 
      this.stateService.setMaxToken(this.maxTokens);
      break;
      case 'Top P': this.topP = newValue;
      this.stateService.settopP(this.topP);
      break;
      case 'Top K': this.topK = newValue;
      this.stateService.settopK(this.topK);
      break;
      case 'Frequency Penalty': this.frequencyPenalty = newValue;
      this.stateService.setfrequencyPenalty(this.frequencyPenalty);
      break;
    }
  }
}
