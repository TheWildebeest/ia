import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public data: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const dataSubscription = this.dataService.getData()
      .pipe(
        tap(console.log),
        map(response => response.data)
      )
    .subscribe((data) => {
      this.data = data;
    });
    this.subscription.add(dataSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
