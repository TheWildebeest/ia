import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChartData, Post } from 'src/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public data: Post[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const dataSubscription = this.dataService.getData()
      .pipe(
        tap(console.log),
        map(data => data.map((item: any, index: number) => {
          return { ...item, id: index };
        }))
      )
    .subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
    this.subscription.add(dataSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
