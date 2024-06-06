import { Component, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { StateService } from '../../services/state.service'
import { BackendService } from 'src/app/services/backend.service';
import { tap, finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent implements AfterViewChecked {
  model: string = 'gpt-3.5-turbo';
  provider: string = 'OPENAI';
  apiKey: string = '';
  temperature: number = 0.7;
  maxTokens: number = 1000;
  topP: number = 1;
  frequencyPenalty: number = 0.43;
  topK: number = 32;
  setUserInput: Array<any> = [];
  chatResponse: string = '';
  loading: boolean = false;
  textStreaming: boolean = true;
  sessionId: string = '';
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private stateService: StateService, private backendService: BackendService, private changeDetectorRef: ChangeDetectorRef, private message: NzMessageService) {
    this.stateService.model$.subscribe(model => this.model = model)
    this.stateService.provider$.subscribe(provider => this.provider = provider)
    this.stateService.apiKey$.subscribe(apiKey => this.apiKey = apiKey)
    this.stateService.temperature$.subscribe(temperature => { this.temperature = temperature; })
    this.stateService.maxTokens$.subscribe(maxTokens => this.maxTokens = maxTokens)
    this.stateService.topP$.subscribe(topP => this.topP = topP)
    this.stateService.frequencyPenalty$.subscribe(frequencyPenalty => this.frequencyPenalty = frequencyPenalty)
    this.stateService.topK$.subscribe(topK => this.topK = topK)
    this.stateService.userInput$.subscribe(userInput => this.setUserInput = userInput)
  }

  ngOnInit(): void {
    this.sessionId = `${Math.floor(Math.random() * (99000 - 10000) + 10000)}`
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  sendMessage(userMessage: string) {

    if (!this.apiKey) {
      this.message.error(`Set your ${this.provider} API Key to continue conversation`, { nzDuration: 3000 });
      return;
    }

    this.stateService.setUserInput({ 'type': 'user', 'message': userMessage });

    this.loading = true;

    const obj = {
      message: userMessage,
      model: this.model,
      provider: this.provider,
      apiKey: this.apiKey,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
      topP: this.topP,
      frequencyPenalty: this.frequencyPenalty,
      topK: this.topK,
      sessionId: this.sessionId
    }

    this.backendService.sendMessagePrompt(obj)
      .pipe(
        tap((chunk: string) => {
          this.textStreaming = false;
          this.chatResponse += chunk;
          this.changeDetectorRef.detectChanges();
        }),
        finalize(() => {
          this.stateService.setUserInput({ 'type': 'chat', 'message': this.chatResponse });
          this.chatResponse = '';
          this.loading = false;
        })
      )
      .subscribe(
        {
          complete: () => {
            this.textStreaming = true;
          },
          error: (err) => {
            this.message.error(`Error: ${err.message}`, { nzDuration: 3000 });
          }
        }
      );
  }
}
