import { Component, Output, EventEmitter, Input } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent {
  userInput: string = '';
  @Input() loading: boolean = false;
  @Output() onMessage = new EventEmitter<string>();

  constructor(private stateService: StateService){}

  adjustHeight(): void {
    const textarea = document.getElementById('textBox') as HTMLTextAreaElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  setUserInput(): void {
    if(!this.userInput) return;
    
    // this.stateService.setUserInput({'type': 'user', 'message': this.userInput});
    this.onMessage.emit(this.userInput);
    this.userInput = ''
  }
}
