import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/chat'

  constructor(private http: HttpClient) { }

  sendMessagePrompt(request: object): Observable<string> {
    return new Observable(observer => {
      const controller = new AbortController();
      const signal = controller.signal;
  
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        signal: signal
      }).then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            observer.error(new Error(text));
          });
        }
  
        // Add a return statement here
        return handleResponseBody(response, observer);
      }).catch(error => {
        observer.error(error);
      });
  
      return () => controller.abort();
    });
  }
}

function handleResponseBody(response: Response, observer: Observer<string>) {
  if (!response.body) {
    observer.error(new Error('Response body is null'));
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  function readStream() {
    reader.read().then(({ done, value }) => {
      if (done) {
        observer.complete();
        return;
      }
      observer.next(decoder.decode(value, { stream: true }));
      readStream();
    }).catch(error => {
      observer.error(error);
    });
  }

  readStream();
}