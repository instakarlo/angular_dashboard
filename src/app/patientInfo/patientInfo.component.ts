import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PatientInfoService } from './patientInfo.service';

import * as Highcharts from 'highcharts';

import * as WaveSurfer from 'wavesurfer.js';

import { environment } from '../../environments/environment';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-patientInfo',
  templateUrl: './patientInfo.component.html',
  styleUrls: ['./patientInfo.component.scss'],
  providers: [PatientInfoService]
})
export class PatientInfoComponent implements OnInit {
  public wavesurfer: any = null;

  public optionsPrediction: any = {
    chart: {
      type: 'line',
      height: 300
    },
    title: {
      text: ''
    },
    credits: {
      enabled: true
    },
    tooltip: {
      formatter: function () {
        return this.x + '  Reading: ' + this.y.toFixed(0);
      }
    },
    xAxis: {
      categories: ['WK1', 'WK2', 'WK3', 'WK4', 'WK5', 'WK6', 'WK7', 'WK8']
    },
    series: [{
      name: 'Actual Readings',
      data: [43934, 55503, 56277, 59658, 67031, 89931]
    }, {
      name: 'Predicted Readings',
      data: [43934, 52503, 57177, 60658, 68031, 90031, 107133, 114175],
      dashStyle: 'dot'
    }]
  };

  public movingLineOptions: any = {
    chart: {
      type: 'spline',
      height: 300
    },
    title: {
      text: ''
    },
    credits: {
      enabled: true
    },
    legend: {
      enabled: false
    },
    accessibility: {
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 15000,
        announcementFormatter: function (allSeries: any, newSeries: any, newPoint: any) {
          if (newPoint) {
            return 'New point added. Value: ' + newPoint.y;
          }
          return false;
        }
      }
    },
    data: {
      csvURL: environment.movingChartCsv,
      enablePolling: true,
      dataRefreshRate: 2
    }
  };

  public reading: any = {
    value: 'Please upload audio file',
    confidence: 0,
    color: 'gray'
  };

  public gaugeOptions: any = {
    chart: {
      type: 'solidgauge',
      height: 198
    },
    title: null,
    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    exporting: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: true
    },
    series: [{
      name: 'Confidence Level',
      // data: [0],
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:25px">{y}</span><br/>' +
          '<span style="font-size:12px;opacity:0.4">%</span>' +
          '</div>'
      },
      tooltip: {
        valueSuffix: ' %'
      }
    }]
  };

  public tableData: TableData;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.tableData = {
      headerRow: ['Date', 'Time', 'Issue', 'Temperature (C)', 'Blood Pressure', 'Findings', 'Remarks'],
      dataRows: [
        ['2019-11-14', '13:45', 'Patient has cough for 2 days', '37.5', '121/80', `Temp and BP is OK. Patient has phlegm.
        Breathing has some congestion`, 'Antibiotics and Anti-cough meds given to patient. Asked to go back next month'],
        ['2019-12-18', '13:32', 'Follow-up check-up', '37.5', '120/80', `Temp and BP is OK. Patient still coughing.
        Breathing has some congestion`, `Recommended to go x-ray and go back next week for results`],
        ['2019-12-28', '10:00', 'Follow-up check-up', '37.2', '120/81', `Temp and BP is OK. Patient is recovering.
        Breathing still has some congestion. X-ray results show some blockage`,
          `Asked patient to drink antibiotics and got for check-up next month`],
        ['2019-01-28', '11:00', 'Follow-up check-up', '37.0', '120/81', `Temp and BP is OK. Patient is OK now.
        Breathing is OK. No congestion found.`,
          `Asked patient to go for another X-ray. Stopped anti-biotic. For check-up next week`],
        ['2019-02-11', '11:00', 'Follow-up check-up', '37.0', '120/80', `Temp and BP is OK. Patient is OK.
        Breathing is OK. No congestion found. X-ray is OK.`,
          `Asked patient to monitor and go back next month for follow-up check-up`]
      ]
    };
  }

  getAnalyticsColor() {
    return this.reading.color;
  }

  onAudioFileUpload(evt: any) {
    try {
      // reset chart
      this.reading = {
        value: 'Loading...',
        confidence: 0,
        color: 'gray'
      };
      this.updateGauge();

      const files = evt.srcElement.files;

      if (files != null && files.length >= 0) {
        const soundFile: string = URL.createObjectURL(files[0]);
        // const audio_player: any = document.getElementById('audio_player');
        // audio_player.pause();
        // audio_player.setAttribute('src', soundFile);
        // audio_player.load();
        // audio_player.play();

        this.startWaveForm(soundFile);
        this.getAcousticScore(files[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  onPlayPressed(): void {
    if (this.wavesurfer) {
      this.wavesurfer.play();
    }
  }

  onStopPressed(): void {
    if (this.wavesurfer) {
      this.wavesurfer.stop();
    }
  }

  private updateGauge() {
    this.gaugeOptions = {
      chart: {
        type: 'solidgauge',
        height: 198
      },
      title: null,
      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      // the value axis
      yAxis: {
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
          text: 'Confidence Level'
        },
        labels: {
          y: 16
        },
        min: 0,
        max: 100
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      credits: {
        enabled: true
      },
      series: [{
        name: 'Confidence Level',
        data: [this.reading.confidence],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">%</span>' +
            '</div>'
        },
        tooltip: {
          valueSuffix: ' %'
        }
      }]
    };
  }

  private startWaveForm(url: string): void {
    if (!this.wavesurfer) {
      this.generateWaveform();
    }

    this.wavesurfer.load(url);
  }

  private generateWaveform(): void {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#109CFF',
      progressColor: 'black'
    });

    this.wavesurfer.on('ready', () => {
      this.wavesurfer.play();
    });
  }

  private async getAcousticScore(file: File) {
    this.reading = {
      value: 'Normal',
      confidence: 100,
      color: '#ffbc67'
    };
    this.updateGauge();
  }
}
