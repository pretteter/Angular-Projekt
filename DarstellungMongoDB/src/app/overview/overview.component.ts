import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { dataToShow } from 'src/app/_interface/dataToShow';
import { map, Subscription, timer } from 'rxjs';

import { lineChart } from '../charts/linechart';
import { LineChartOptions } from '../charts/linechart';

import { PieChartOptions } from '../charts/pieChart';
import { pieChart } from '../charts/pieChart';

import { ToastService } from 'src/app/_service/toast.service';

import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  public chartNumberToDos: Partial<LineChartOptions>;
  public chartSpaceToDos: Partial<PieChartOptions>;
  chartArray: any[] = [];

  public allTodoDataFromServer: dataToShow = {
    entries: null,
    averageSizeOneEntrie: null,
    sizeAllEntries: null,
    avaliableSpace: null,
    freeSpace: null,
    scaleFactor: null,
  };
  timerSubscription: Subscription;

  constructor(
    public _dataService: DataService,
    public toastService: ToastService
  ) {
    this.chartNumberToDos = lineChart;
    this.chartSpaceToDos = pieChart;
    this.chartArray.push(this.chartNumberToDos);
  }

  ngOnInit(): void {}

  getData(seconds: number) {
    try {
      this.timerSubscription = timer(0, seconds * 1000)
        .pipe(
          map(() => {
            this.getDataOnce();
            this.pushDataInLineChart();
            this.pushDataInPieChart('Speicherplatz');
          })
        )
        .subscribe();
      this.showSuccess('Daten werden geholt');
    } catch (e) {
      this.showDanger('Beim holen der Daten ist was schief gelaufen');
      console.log(e);
    }
  }

  public getDataOnce() {
    this._dataService.getTodoStats().subscribe({
      next: (stats) => {
        console.log('data load');
        this.allTodoDataFromServer.entries = stats.count;
        this.allTodoDataFromServer.averageSizeOneEntrie = stats.avgObjSize;
        this.allTodoDataFromServer.avaliableSpace = stats.storageSize;
        this.allTodoDataFromServer.freeSpace = stats.freeStorageSize;
        this.allTodoDataFromServer.scaleFactor = stats.scaleFactor;
        this.allTodoDataFromServer.sizeAllEntries = stats.size;
      },
      error: (err) => {
        console.log(err);
        this.showDanger(
          'Fehler beim holen der Daten. Entwicklerkonsole könnte hilfreich sein'
        );
      },
      complete: () => {
        console.log('stats completed');
      },
    });

    // this._dataService.getServerStats().subscribe({
    //   next: (stats) => {
    //     console.log('data load from Server');
    //     console.log(stats)

    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.showDanger(
    //       'Fehler beim holen der Daten. Entwicklerkonsole könnte hilfreich sein'
    //     );
    //   },
    //   complete: () => {
    //     console.log('stats completed');
    //   },
    // });
  }

  stopGetData() {
    this.timerSubscription?.unsubscribe();
    this.showDanger('Datenfluss gestoppt');
    this.resetDataFromServer();
  }

  resetDataFromServer() {
    for (let key of Object.keys(this.allTodoDataFromServer)) {
      this.allTodoDataFromServer[key] = null;
    }
    // this.showDanger('Daten resettet');
  }

  isDataFromServerComplete(): boolean {
    for (let key of Object.keys(this.allTodoDataFromServer)) {
      if (this.allTodoDataFromServer[key] == null) {
        return false;
      }
    }
    return true;
  }

  pushDataInLineChart() {
    // this.chartNumberToDos.series = [{ data: this.getValuesForLineChart() }];

    let options = [
      {
        name: 'Anzahl an Todos',
        type: 'line',
        data: this.getValuesForLineChart(),
      },
      {
        name: 'Durschnittliche Größe',
        type: 'column',
        data: this.getValuesForLineChart(true),
      },
    ];
    this.chartNumberToDos.series = options;
    this.chartNumberToDos.xaxis.categories.length > 8
      ? this.chartNumberToDos.xaxis.categories.shift()
      : '';
    this.chartNumberToDos.xaxis.categories.push(new Date().toLocaleString());
  }

  pushDataInPieChart(title: string) {
    const unknownSpace: number =
      this.allTodoDataFromServer.avaliableSpace -
      this.allTodoDataFromServer.freeSpace -
      this.allTodoDataFromServer.sizeAllEntries;

    this.chartSpaceToDos.title.text = title;
    this.chartSpaceToDos.labels = [
      'freier Speicher',
      'verwendeter Speicher',
      'unbekannter Speicher',
    ];
    this.chartSpaceToDos.series = [
      this.allTodoDataFromServer.freeSpace,
      this.allTodoDataFromServer.sizeAllEntries,
      unknownSpace,
    ];
  }

  getValuesForLineChart(avgSize?: boolean): number[] {
    let newData: number[] = [];
    this.chartNumberToDos.series[avgSize ? 1 : 0].data.forEach((i) => {
      newData.push(Number(i));
    });
    if (newData.length >= this.chartNumberToDos.xaxis.categories.length) {
      newData.shift();
    }

    if (avgSize) {
      this.allTodoDataFromServer.averageSizeOneEntrie
        ? newData.push(this.allTodoDataFromServer.averageSizeOneEntrie)
        : '';
    } else {
      this.allTodoDataFromServer.entries
        ? newData.push(this.allTodoDataFromServer.entries)
        : '';
    }
    return newData;
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger(message?: string, dangerTpl?: TemplateRef<any>) {
    if (dangerTpl) {
      console.log(dangerTpl.elementRef.nativeElement);
      this.toastService.show(dangerTpl, {
        classname: 'bg-danger text-light',
        delay: 15000,
      });
    } else {
      this.toastService.show(message ? message : 'error', {
        classname: 'bg-danger text-light',
        delay: 15000,
      });
    }
  }

  ngOnDestroy(): void {
    this.toastService.clear();
    this.stopGetData();
  }
}
