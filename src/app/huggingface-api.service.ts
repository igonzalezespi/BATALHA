import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HuggingfaceApiService {

  private apiUrl = 'https://api-inference.huggingface.co/models/';
  private apiKey = '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';

  private imageModel = 'stabilityai/stable-diffusion-xl-base-1.0';

  constructor(private http: HttpClient) { }

  getImage(prompt: string): Observable<Blob> {
    return this.http.post(
      this.apiUrl + this.imageModel,
      {
        inputs: prompt
      },
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'image/jpeg',
        }),
        responseType: 'blob'
      }
    );
  }
}
