import { Injectable } from '@angular/core';
import { HuggingfaceApiService } from './huggingface-api.service';
import { Observable, map } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ImageService {
  constructor(
    private huggingfaceApiService: HuggingfaceApiService,
    private sanitizer: DomSanitizer
  ) { }

  getImage(name: string): Observable<SafeUrl> {
    return this.huggingfaceApiService.getImage(`realistic ${name} prepared for battle`)
      .pipe(
        map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
      );
  }
}
