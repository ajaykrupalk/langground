import { Component } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css'],
  styles: [
    `
      [nz-button] {
        margin-top: 20px;
        width: 100px;
        margin-right: 8px;
        margin-bottom: 8px;
      }
      [nz-menu]{
        width: 200px;
      }
    `
    ]
})
export class SecretsComponent {
  value1 = 30;
}
