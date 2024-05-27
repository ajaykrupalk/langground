import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/chat'

  constructor(private http: HttpClient) {}

  sendMessagePrompt(request: object): Observable<any>{
    return this.http.post(
      this.apiUrl,
      request
    )
  }
}
