import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-patient-details',
  templateUrl: './doctor-patient-details.component.html',
  styleUrls: ['./doctor-patient-details.component.css']
})
export class DoctorPatientDetailsComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private doctorService : DoctorService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.getPatientInfo(this.id);
  }

  id : String;

  patient = {
    _id : '',
    firstName : '',
    lastName : '',
    villege : '',
    mobileNo : '',
    diseases : [],
    visitedDates : [],
    treatment : [],
    cure  : false
  }

  getPatientInfo(id){

    this.doctorService.getPatientInfo(id)
    .subscribe(
      data =>{
        this.patient._id = data.patient._id;
        this.patient.firstName = data.patient.firstName;
        this.patient.lastName = data.patient.lastName;
        this.patient.villege = data.patient.villege;
        this.patient.mobileNo = data.patient.mobileNo;
        this.patient.diseases = data.patient.diseases;
        this.patient.visitedDates = data.patient.visitedDates;
        this.patient.treatment = data.patient.treatment;
        this.patient.cure = data.patient.cure
      }
    )
  }

  updatePatient(patient){

    patient.cure = ! patient.cure;

    this.doctorService.updatePatient(patient)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }

}
