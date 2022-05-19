import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { dataToShow } from 'src/app/_interface/dataToShow';
import { map, Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public allDataFromServer: dataToShow = {
    entries: null,
    averageSizeOneEntrie: null,
    sizeAllEntries: null,
    avaliableSpace: null,
    freeSpace: null,
    scaleFactor: null,
  };
  timerSubscription: Subscription;
  constructor(public _dataService: DataService) {}

  ngOnInit(): void {

  }

  getData(seconds: number) {
    this.timerSubscription = timer(0, seconds * 1000)
      .pipe(
        map(() => {
          this.getDataOnce();
        })
      )
      .subscribe();
  }

  public getDataOnce() {
    this._dataService.getStats().subscribe({
      next: (stats) => {
        console.log('data load');
        this.allDataFromServer.entries = stats.count;
        this.allDataFromServer.averageSizeOneEntrie = stats.avgObjSize;
        this.allDataFromServer.avaliableSpace = stats.storageSize;
        this.allDataFromServer.freeSpace = stats.freeStorageSize;
        this.allDataFromServer.scaleFactor = stats.scaleFactor;
        this.allDataFromServer.sizeAllEntries = stats.size;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('stats completed');
      },
    });
  }

  stopGetData() {
    this.timerSubscription?.unsubscribe();
    this.resetDataFromServer();
  }

  resetDataFromServer() {
    for (let key of Object.keys(this.allDataFromServer)) {
      this.allDataFromServer[key] = null;
    }
  }

  isDataFromServerComplete(): boolean {
    for (let key of Object.keys(this.allDataFromServer)) {
      if (this.allDataFromServer[key]==null) {
        return false;
      }
    }
    return true;
  }
}
