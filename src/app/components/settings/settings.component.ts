import { Component, Input } from '@angular/core';

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
      { value: 'Temperature', max: 2.0, min: 0.0, variable: this.temperature, step: 0.1, description: 'Sampling temperature to use' },
      { value: 'Max Tokens', max: 4096, min: 0,  variable: this.maxTokens, step: 1, description: 'Maximum number of tokens to generate in the completion.' },
      { value: 'Top P', max: 1, min: 0, variable: this.topP, step: 0.1, description: 'Total probability mass of tokens to consider at each step.'  },
      { value: 'Top K', max: 64, min: 0, variable: this.topK, step: 1, description: 'Changes how the model selects tokens for output.' }
    ],
    'anthropic': [
      { value: 'Temperature', max: 2.0, min: 0.0, variable: this.temperature, step: 0.1, description: 'Sampling temperature to use' },
      { value: 'Max Tokens', max: 4096, min: 0,  variable: this.maxTokens, step: 1, description: 'Maximum number of tokens to generate in the completion.' },
      { value: 'Top P', max: 1, min: 0, variable: this.topP, step: 0.1, description: 'Total probability mass of tokens to consider at each step.'  },
      { value: 'Frequency Penalty', max: 1, min: 0, variable: this.frequencyPenalty, step: 0.1, description: 'Penalizes repeated tokens according to frequency.' }
    ],
  };
}
