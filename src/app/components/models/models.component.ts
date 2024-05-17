import { Component, Output, EventEmitter } from '@angular/core';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent {
  listOfOption: Array<{ label: string; value: string; provider: string }> = [];
  size: NzSelectSizeType = 'default';
  modelValue = 'gpt-3.5-turbo';
  selectedProvider: string = 'OPENAI'
  @Output() selectedProviderChange = new EventEmitter<string>();

  constructor(private stateService: StateService){}

  ngOnInit(): void {
    this.listOfOption = [
      {label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo', provider: 'OpenAI'},
      {label: 'gemini-pro', value: 'gemini-pro',  provider: 'Google'},
      {label: 'claude-2.1', value: 'claude-2.1', provider: 'Anthropic'},
    ];
    this.selectedProviderChange.emit(this.selectedProvider)
  }

  changeProvider(){
    const selectedOption = this.listOfOption.find(option => option.value === this.modelValue);
    this.selectedProvider = selectedOption?.provider.toUpperCase() || 'OPENAI';
    this.selectedProviderChange.emit(this.selectedProvider)
    this.stateService.setProvider(this.selectedProvider);
  }

  changeModel(newModel: any) {
    this.modelValue = newModel;
    this.stateService.setModel(this.modelValue);
  }
}
