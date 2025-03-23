import { Component } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-modelcard',
  templateUrl: './modelcard.component.html',
  styleUrls: ['./modelcard.component.css']
})
export class ModelcardComponent {
  provider: string = 'OpenAI'
  description: string = ''
  model: string = ''
  modelPage: string = ''
  pricing: string = ''
  docs: string = ''

  constructor(private stateService: StateService) {
    this.stateService.provider$.subscribe(provider => {
      this.provider = provider;
      this.assignModelCard(this.provider);
    });
    this.stateService.model$.subscribe(model => this.model = model);
  }

  assignModelCard(provider: string) {
    switch (provider.toLowerCase()) {
      case 'openai':
        this.description = "OpenAI's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks."
        this.model = 'gpt-3.5-turbo'
        this.modelPage = 'https://platform.openai.com/docs/models/gpt-3-5-turbo'
        this.pricing = 'https://openai.com/api/pricing/'
        this.docs = 'https://js.langchain.com/v0.2/docs/integrations/chat/openai'
        break;
      case 'google':
        this.description = "The multi-modal model from Google's Gemini family that balances model performance and speed. Exhibits strong generalist capabilities and excels particularly in cross-modal reasoning."
        this.model = 'gemini-1.5-pro'
        this.modelPage = 'https://deepmind.google/technologies/gemini/'
        this.pricing = 'https://ai.google.dev/pricing'
        this.docs = 'https://js.langchain.com/v0.2/docs/integrations/chat/google_generativeai'
        break;
      case 'anthropic':
        this.description = "Anthropic's most powerful model that excels at a wide range of tasks from sophisticated dialogue and creative content generation to detailed instruction. It is good for complex reasoning, creativity, thoughtful dialogue, coding,and detailed content creation."
        this.model = 'claude-2.1'
        this.modelPage = 'https://www.anthropic.com/news/claude-2-1'
        this.pricing = 'https://www.anthropic.com/api'
        this.docs = 'https://js.langchain.com/v0.2/docs/integrations/chat/anthropic'
        break;
    }
  }
}
