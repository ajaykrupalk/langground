import { Component, Input } from '@angular/core';
import { StateService } from '../../services/state.service'

@Component({
  selector: 'app-user-response',
  templateUrl: './user-response.component.html',
  styleUrls: ['./user-response.component.css']
})
export class UserResponseComponent {
  @Input() userMessage: string = '';
  userResponse: string = '';

  constructor(private stateService: StateService){}

}
