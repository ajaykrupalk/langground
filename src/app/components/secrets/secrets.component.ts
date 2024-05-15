import { Component, Input } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent {
  apiKey?: string;
  passwordVisible = false;
  @Input() selectedProvider: string = 'OPENAI';

  changeAPIKey(newAPIKey: string){
    this.apiKey = newAPIKey;
  }
}
