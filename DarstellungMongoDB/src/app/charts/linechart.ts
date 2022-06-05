import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNoData,
  ApexYAxis
} from 'ng-apexcharts';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  noData: ApexNoData;
};

export let lineChart: Partial<LineChartOptions> = {
  series: [
    {
      name: '',
      type: "",
      data: [],
    },
    {
      name: "",
      type: "",
      data: []
    },
  ],
  chart: {
    height: 350,
    type: 'line',
    foreColor:'white',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: ' ToDo',
    align: 'left',
  },
  grid: {
    // row: {
    //   colors: ['#f3f3f3', 'transparent'],
    //   opacity: 0.5,
    // },
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
  yaxis: [
    {
      title: {
        text: "Anzahl Todos"
      }
    },
    {
      opposite: true,
      title: {
        text: "Durschnittliche Größe"
      }
    }
  ],
  xaxis: {
    categories: [''],
  },
};
