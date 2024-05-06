import { Component } from '@angular/core';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  listOfOption: Array<{ label: string; value: string; provider: string }> = [];
  size: NzSelectSizeType = 'default';
  singleValue = 'openai-gpt-3';
  value1 = 30;
  selectedProvider: string = 'OPENAI'
  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.listOfOption = [
      {label: 'gpt-3', value: 'openai-gpt-3', provider: 'OpenAI'},
      {label: 'gemini-pro', value: 'google-gemini-pro',  provider: 'Google'},
      {label: 'claude-3', value: 'anthropic-claude-3', provider: 'Anthropic'},
    ];
  }

  test(){
    const selectedOption = this.listOfOption.find(option => option.value === this.singleValue)
    this.selectedProvider = selectedOption?.provider.toUpperCase() || 'OPENAI'
  }
}
