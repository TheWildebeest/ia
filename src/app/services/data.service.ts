import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Post } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

    public getData(): Observable<Post[]> {
      return this.http.get<{ data: Post[]}>('assets/data/data.json')
      .pipe(
        delay(1500),
        map(response => {
          const data = response.data;
          return data.map(item => {
            return {
              ...item,
              chart: item.chart.map(xy => {
                return {
                  x: new Date(xy.x),
                  y: xy.y
                };
              })
              };
          });
        })
        );
  }
}
