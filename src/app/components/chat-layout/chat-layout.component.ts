import { Component } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent {
  textareaContent: string = '';
  model: string = 'gpt-3.5-turbo';
  provider: string = 'OPENAI';
  apiKey: string = '';
  temperature: number = 0.7;
  maxTokens: number = 1000;
  topP: number = 1;
  frequencyPenalty: number = 0.43;
  topK: number = 32;
  setUserInput: Array<any> = [];

  constructor(private stateService: StateService){
    this.stateService.model$.subscribe(model => this.model = model)
    this.stateService.provider$.subscribe(provider => this.provider = provider)
    this.stateService.apiKey$.subscribe(apiKey => this.apiKey = apiKey)
    this.stateService.temperature$.subscribe(temperature => this.temperature = temperature)
    this.stateService.maxTokens$.subscribe(maxTokens => this.maxTokens = maxTokens)
    this.stateService.topP$.subscribe(topP => this.topP = topP)
    this.stateService.frequencyPenalty$.subscribe(frequencyPenalty => this.frequencyPenalty = frequencyPenalty)
    this.stateService.topK$.subscribe(topK => this.topK = topK)
    this.stateService.userInput$.subscribe(userInput => this.setUserInput = userInput)
  }
}
