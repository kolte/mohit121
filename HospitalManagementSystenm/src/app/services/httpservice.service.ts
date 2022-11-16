import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response, RequestOptions } from '@angular/http';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  URL = 'https://localhost:44305/api/';
  GetHeader() {  
    var headers = new Headers();
    return headers;
  }
  constructor(private http: HttpClient) { }


  //-------------Patient Table
  getAllPatients() {
    return this.http.get(this.URL + "patient/getAllPatient");
  }

  getPatientById(Id: number) {
    return this.http.get(this.URL + "patient/getPatientById/?id="+Id);
  }

  deletePatientById(Id: number) {
    return this.http.delete(this.URL + "patient/deletePatient/?id=" + Id);
  }

  createPatient(model: any) {
    console.log(model);
    return this.http.post(this.URL + "patient/addPatient", { "Name": model.Name, "Age": model.Age, "Sex": model.Sex, "CheckIn": "2018-08-22"});
  }

  updatePatient(model: any) {
    console.log(model);
    return this.http.post(this.URL + "patient/updatePatient", { "Name": model.Name, "Age": model.Age, "Sex": model.Sex, "CheckIn": "2018-08-22","Id":model.Id });
  }



  //------------Patient history table

  getPatientHistoryById(Id: number) {
    return this.http.get(this.URL + "patienthistory/getPatienHistorytById/?id=" + Id);
  }

  createPatientHistory(model: any) {
    console.log(model);
    return this.http.post(this.URL + "patienthistory/addPatientHistory", { "PatientHistoryId": model.PatientHistoryId, "Weight": model.Weight, "Smoking": model.Smoking, "Height": model.Height, "Alcohol": model.Alcohol });
  }

  updatePatientHistory(model: any) {
    console.log(model);
    return this.http.post(this.URL + "patienthistory/updatePatientHistory", { "Id":model.Id,"PatientHistoryId": model.PatientHistoryId, "Weight": model.Weight, "Smoking": model.Smoking, "Height": model.Height, "Alcohol": model.Alcohol });
  }
}
