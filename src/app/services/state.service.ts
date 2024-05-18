import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private modelSubject = new BehaviorSubject<string>('gpt-3.5-turbo');
  private providerSubject = new BehaviorSubject<string>('OPENAI');
  private apiKeySubject = new BehaviorSubject<string>('');
  private temperatureSubject = new BehaviorSubject<number>(0.7);
  private maxTokensSubject = new BehaviorSubject<number>(1000);
  private topPSubject = new BehaviorSubject<number>(1);
  private frequencyPenaltySubject = new BehaviorSubject<number>(0.43);
  private topKSubject = new BehaviorSubject<number>(32);

  model$ = this.modelSubject.asObservable();
  provider$ = this.providerSubject.asObservable();
  apiKey$ = this.apiKeySubject.asObservable();
  temperature$ = this.temperatureSubject.asObservable();
  maxTokens$ = this.maxTokensSubject.asObservable();
  topP$ = this.topPSubject.asObservable();
  frequencyPenalty$ = this.frequencyPenaltySubject.asObservable();
  topK$ = this.topKSubject.asObservable();

  setModel(model: string){
    this.modelSubject.next(model);
  }

  setProvider(provider: string){
    this.providerSubject.next(provider);
  }
  
  setApiKey(apiKey: string){
    this.apiKeySubject.next(apiKey);
  }

  setTemperature(temperature: number){
    this.temperatureSubject.next(temperature);
  }

  setMaxToken(maxToken: number){
    this.maxTokensSubject.next(maxToken);
  }

  settopP(topP: number){
    this.topPSubject.next(topP);
  }

  setfrequencyPenalty(frequencyPenalty: number){
    this.frequencyPenaltySubject.next(frequencyPenalty);
  }

  settopK(topK: number){
    this.topKSubject.next(topK);
  }
}
