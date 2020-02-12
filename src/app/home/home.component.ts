import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public appointmentChartType: ChartType;
    public appointmentChartData: any;
    public appointmentChartLegendItems: LegendItem[];

    public consultationChartType: ChartType;
    public consultationChartData: any;
    public consultationChartOptions: any;
    public consultationChartResponsive: any[];
    public consultationChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];
  constructor() { }

  ngOnInit() {
      this.appointmentChartType = ChartType.Pie;
      this.appointmentChartData = {
        labels: ['54%', '40%', '6%'],
        series: [54, 40, 6]
      };
      this.appointmentChartLegendItems = [
        { title: 'Male', imageClass: 'fa fa-circle text-info' },
        { title: 'Female', imageClass: 'fa fa-circle text-danger' },
        { title: 'Children', imageClass: 'fa fa-circle text-warning' }
      ];

      this.consultationChartType = ChartType.Line;
      this.consultationChartData = {
        labels: ['02/01', '02/02', '02/03', '02/04', '02/05', '02/06', '02/07', '02/08', '02/09', '02/10', '02/11'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.consultationChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.consultationChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            }
          }
        }]
      ];
      this.consultationChartLegendItems = [
        { title: 'Pulmonology', imageClass: 'fa fa-circle text-info' },
        { title: 'Cardiology', imageClass: 'fa fa-circle text-danger' },
        { title: 'Otolaryngology', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
          [100, 80, 108, 220, 254, 197, 100, 165, 290, 390, 476, 295]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Male', imageClass: 'fa fa-circle text-info' },
        { title: 'Female', imageClass: 'fa fa-circle text-danger' },
        { title: 'Children', imageClass: 'fa fa-circle text-warning' }
      ];
    }

}
