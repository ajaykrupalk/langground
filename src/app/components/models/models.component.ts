import { Component, OnInit } from '@angular/core';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent {
  listOfOption: Array<{ label: string; value: string; provider: string }> = [];
  size: NzSelectSizeType = 'default';
  singleValue = 'openai-gpt-3';

  ngOnInit(): void {
    this.listOfOption = [
      {label: 'OpenAI gpt-3', value: 'openai-gpt-3', provider: 'OpenAI'},
      {label: 'Google gemini-pro', value: 'google-gemini-pro',  provider: 'Google'},
      {label: 'Anthropic claude-3', value: 'anthropic-claude-3', provider: 'Anthropic'},
    ];
  }

  test(selected: any){
    console.log(selected)
  }
}
