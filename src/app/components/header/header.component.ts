import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedProvider: string = 'OPENAI'

  ngOnInit(): void {
  }

  onselectedProviderChange(newProvider: string): void {
    this.selectedProvider = newProvider;
  }
}
