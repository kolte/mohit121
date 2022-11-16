import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: HttpserviceService) { }
  patientList: any[] = [];
  data: any = [];
  ngOnInit(): void {
    this.getAllList();
  }

  getAllList() {
    this.apiService.getAllPatients().subscribe(
      res => {
        this.data = res;
        for (let i = 0; i < this.data.length; i++) {
          this.patientList.push({ "Name": this.data[i].Name });
        }
        console.log(this.patientList, JSON.parse(JSON.stringify(res)));
      });
  }

}
