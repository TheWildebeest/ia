import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

    public getData(): Observable<unknown> {
      return this.http.get('assets/data/data.json')
      .pipe(delay(1500));
  }
}
