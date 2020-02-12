import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-patientList',
  templateUrl: './patientList.component.html',
  styleUrls: ['./patientList.component.css']
})
export class PatientListComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

  constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'ID', 'Name', 'Country', 'City', 'Email'],
          dataRows: [
              ['1', 'Karlo', 'Philippines', 'Manila', 'instakarlo@github.com'],
              ['2', 'Kiyo', 'Japan', 'Tokyo', 'kiyo@github.com'],
              ['3', 'Ai', 'Singapore', 'Singapore', 'ai@github.com'],
              ['4', 'Jung', 'Korea, South', 'Seoul', 'jung@github.com'],
              ['5', 'Steve Rogers', 'USA', 'Los Angeles', 'rogers@avengers.com'],
              ['6', 'Chun Li', 'China', 'Beijing', 'chunli@streefigh.com']
          ]
      };
      this.tableData2 = {
          headerRow: [ 'ID', 'Name',  'Country', 'City', 'Email' ],
          dataRows: [
              ['1', 'Harry Potter', 'UK', 'England', 'hp@hp.com' ],
              ['2', 'Minerva McGonaggal', 'Curaçao', 'Sinaai-Waas', 'minerva@hp.com'],
              ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', 'sage@baileux.com.nh' ],
              ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', 'oppa@sk.com' ],
              ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', 'dorris@fik.com'],
              ['6', 'Mason Porter', 'Chile', 'Gloucester', 'mason@abc.com' ]
          ]
      };
  }

}
