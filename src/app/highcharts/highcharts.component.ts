import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import Annotations from 'highcharts/modules/annotations'; // Load the annotations module.
Annotations(Highcharts); // Initialize annotations module.
import Drilldown from 'highcharts/modules/drilldown'; // Load the drilldown module.
Drilldown(Highcharts); // Initialize drilldown module.
import Exporting from 'highcharts/modules/exporting'; // Load the exporting module.
Exporting(Highcharts); // Initialize exporting module.
import ExportingData from 'highcharts/modules/export-data'; // Load the export-data module.
ExportingData(Highcharts); // Initialize export-data module.
import NoDataToDisplay from 'highcharts/modules/no-data-to-display'; // Load the no-data-to-display module.
NoDataToDisplay(Highcharts); // Initialize no-data-to-display module.
import More from 'highcharts/highcharts-more'; // Load the more module.
More(Highcharts); // Initialize more module.
import NetworkGraph from 'highcharts/modules/networkgraph'; // Load the more module.
NetworkGraph(Highcharts); // Initialize networkgraph module.
import Data from 'highcharts/modules/data'; // Load the more module.
Data(Highcharts); // Initialize networkgraph module.
import SolidGauge from 'highcharts/modules/solid-gauge'; // Load the more module.
SolidGauge(Highcharts); // Initialize networkgraph module.

@Component({
    selector: 'app-highcharts',
    templateUrl: './highcharts.component.html',
    styles: [`highcharts-chart {
        width: 100%;
        display: block;
    }`]
})
export class HighchartsComponent implements OnInit, OnChanges {
    static currentId = 1;

    highcharts = Highcharts;

    @Input()
    public title: string;

    @Input()
    public subtitle: string;

    @Input()
    public options: any;

    @Input()
    public footerIconClass: string;

    @Input()
    public footerText: string;

    @Input()
    public withHr: boolean;

    public chartId: string;
    public isShowChart = false;

    constructor() {
    }

    public ngOnInit(): void {
        this.chartId = `high-chart-${HighchartsComponent.currentId++}`;
    }

    public ngOnChanges() {
        if (this.options) {
            this.isShowChart = true;

            this.options.colors = ['#109CFF', '#EE2D20', '#ED8D00', '#1DC7EA', '#1D62F0', '#9A9A9A'];
        } else {
            this.isShowChart = false;
        }
    }
}
