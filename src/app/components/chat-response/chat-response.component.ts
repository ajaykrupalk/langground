import { Component, Input } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-chat-response',
  templateUrl: './chat-response.component.html',
  styleUrls: ['./chat-response.component.css']
})
export class ChatResponseComponent {
  @Input() chatMessage: string = '';
  @Input() loading: boolean = false;

  constructor(private stateService: StateService){}
}
