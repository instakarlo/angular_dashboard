
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HighchartsChartModule } from 'highcharts-angular';

import { HighchartsComponent } from './highcharts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HighchartsChartModule
  ],
  declarations: [
    HighchartsComponent
  ],
  exports: [
    HighchartsComponent
  ]
})
export class HighchartsModule { }
