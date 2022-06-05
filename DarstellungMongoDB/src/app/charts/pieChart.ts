import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexNoData,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  noData: ApexNoData;
  title: ApexTitleSubtitle;
};

export let pieChart: Partial<PieChartOptions> = {
  series: [],
  chart: {
    width: 480,
    type: 'pie',
    foreColor: 'white',
    animations: {
      enabled: false,
    },
  },
  labels: [],
  responsive: [
    {
      breakpoint: 1000,
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        chart: {
          height: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  title: {
    text: '',
    align: 'left',
    // margin: 10,
    // offsetX: 0,
    // offsetY: 0,
    // floating: false,
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: undefined,
      color: undefined,
    },
  },
  noData: {
    text: 'Warten auf Daten...',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: '19px',
      fontFamily: undefined,
    },
  },
};
