import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpserviceService } from '../../services/httpservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientModel, PatientHistoryModel } from '../../Models/PatientModel';
declare const $: any;
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  @ViewChild('mymodalDelete') content: any;
  @ViewChild('mymodalAdd') addModal: any;
  @ViewChild('mymodalopen') viewModal: any;
  @ViewChild('mymodalAddHistory') patientHistoryModal: any;
  model: PatientModel = new PatientModel();
  pmodel: PatientHistoryModel = new PatientHistoryModel();
  title = 'Patient Details';
  closeResult: string = '';
  patientId: number | undefined;
  constructor(private apiService: HttpserviceService, private modalService: NgbModal) { }
  patientList: any = [];
  data: any = [];
  patientDetail: any;
  ModalData: any;
  patientHisDetails: any;
  ngOnInit(): void {
    this.getAllList();
  }



  //--------open modal Patient history
  openHistory(id: number) {
    console.log('pid', id)
    this.pmodel.PatientHistoryId = id;
    this.apiService.getPatientHistoryById(id).subscribe(
      res => {
        var data = res;
        console.log(data);
        if (data == 400) {
          this.PatientHistoryForm.reset();
          this.resetmodal();
          this.modalService.open(this.patientHistoryModal);
        }
        else {
          this.patientHisDetails = res;
          this.pmodel.Height = this.patientHisDetails.Height;
          this.pmodel.Weight = this.patientHisDetails.Weight;
          this.pmodel.Smoking = this.patientHisDetails.Smoking;
          this.pmodel.Alcohol = this.patientHisDetails.Alcohol;
          this.pmodel.Id = this.patientHisDetails.Id;
          this.modalService.open(this.patientHistoryModal);
        }
      });

  }


  PatientHistoryAdd() {
    console.log(this.pmodel);

  
    if (this.PatientHistoryForm.valid) {
      if (this.pmodel.Id == null || this.pmodel.Id == undefined || this.pmodel.Id == 0) {
        this.apiService.createPatientHistory(this.pmodel).subscribe(
          res => {
            var data = res;
            this.PatientHistoryForm.reset();
          
            this.modalService.dismissAll(this.patientHistoryModal);
          });
      }
      else {
        this.apiService.updatePatientHistory(this.pmodel).subscribe(
          res => {
            var data = res;
            this.PatientHistoryForm.reset();
            this.modalService.dismissAll(this.patientHistoryModal);
            this.getAllList();
          });
      }
    }
  }

  //----------Add/Edit patient----------
  onSubmit() {
    if (this.myForm.valid) {
      if (this.model.Id == null || this.model.Id == undefined || this.model.Id == 0) {
        console.log(this.model);
        this.apiService.createPatient(this.model).subscribe(
          res => {
            var data = res;
            this.myForm.reset();
            this.modalService.dismissAll(this.addModal);
            this.getAllList();
          });
      }
      else {
        this.apiService.updatePatient(this.model).subscribe(
          res => {
            var data = res;
            this.myForm.reset();
            this.modalService.dismissAll(this.addModal);
            this.getAllList();
          });
      }
    }
  }

  public myForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    age: new FormControl(null),
    sex: new FormControl(null),
    checkin: new FormControl(null)
  });

  public PatientHistoryForm: FormGroup = new FormGroup({
    height: new FormControl(null, [Validators.required]),
    weight: new FormControl(null, [Validators.required]),
    smoking: new FormControl(null),
    alcohol: new FormControl(null)
  });

  //----------get all patient----------
  getAllList() {
    this.apiService.getAllPatients().subscribe(
      res => {
        this.patientList = res;
        console.log(this.patientList);
      });
  }

  //---------Add PAtient--------

  addPatient() {
    this.modalService.open(this.addModal);
  }


  //-----------edit patient
  edit(id: any): void {
    console.log(id);
    this.apiService.getPatientById(id).subscribe(
      res => {
        this.patientDetail = res;
        this.model.Age = this.patientDetail['Age'];
        this.model.Sex = this.patientDetail['Sex'];
        this.model.Name = this.patientDetail['Name'];
        this.model.Id = this.patientDetail['Id'];
        this.modalService.open(this.addModal);
      });
  }


  //-------Patient DEtails
  open(id: any) {
    this.apiService.getPatientById(id).subscribe(
      res => {
        this.patientDetail = res;
        this.ModalData = res;
        console.log(this.patientDetail);
      });
    this.modalService.open(this.viewModal);
  }



  //private getDismissReason(reason: any): string {
  //  if (reason === ModalDismissReasons.ESC) {
  //    return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
  //  } else {
  //    return `with: ${reason}`;
  //  }
  //}
  //------------Delete-------------
  deleteModal(id: number) {
    this.patientId = id;
    console.log(id);
    this.modalService.open(this.content).result.then((result) => {
      this.removePatient(id);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

  removePatient(id: number): void {
    this.apiService.deletePatientById(id).subscribe(
      res => {
        this.getAllList();
      });
  }

  resetmodal() {
    this.pmodel.Height = undefined;
    this.pmodel.Weight = undefined;
    this.pmodel.Alcohol = undefined;
    this.pmodel.Smoking = undefined;
    this.pmodel.Id = undefined;
  }

}


