import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { dataToShow } from 'src/app/_interface/dataToShow';
import { map, Subscription, timer } from 'rxjs';

import { lineChart } from '../charts/linechart';
import { ChartOptions } from '../charts/linechart';

import { ChartComponent } from 'ng-apexcharts';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public allDataFromServer: dataToShow = {
    entries: null,
    averageSizeOneEntrie: null,
    sizeAllEntries: null,
    avaliableSpace: null,
    freeSpace: null,
    scaleFactor: null,
  };
  timerSubscription: Subscription;

  constructor(public _dataService: DataService) {
    this.chartOptions = lineChart;
  }

  ngOnInit(): void {}

  getData(seconds: number) {
    this.timerSubscription = timer(0, seconds * 1000)
      .pipe(
        map(() => {
          this.getDataOnce();
          this.pushDataInChart();
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
      if (this.allDataFromServer[key] == null) {
        return false;
      }
    }
    return true;
  }

  pushDataInChart() {
    this.chartOptions.series = [{ data: this.getValuesForChart() }];
    this.addValueXaxisForChart(new Date().toLocaleString());
  }

  getValuesForChart(): number[] {
    let newData: number[] = [];
    this.chartOptions.series[0].data.forEach((i) => {
      newData.push(Number(i));
    });
    if (newData.length >= this.chartOptions.xaxis.categories.length) {
      newData.shift();
    }
    if (this.allDataFromServer.entries)
      newData.push(this.allDataFromServer.entries);
    return newData;
  }

  addValueXaxisForChart(data: string) {
    if (this.chartOptions.xaxis.categories.length > 8)
      this.chartOptions.xaxis.categories.shift();
    this.chartOptions.xaxis.categories.push(data);
  }
}
