import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-doctor-campaign-patient',
  templateUrl: './doctor-campaign-patient.component.html',
  styleUrls: ['./doctor-campaign-patient.component.css']
})
export class DoctorCampaignPatientComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private doctorService : DoctorService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.getCampaignDetails(this.id);
    this.getTalukaAndVilleges(this.id);
    this.getListOfPatients(this.id);

  }

  id : String;
  diseases1 = [];
  diseases2 = [];
  diseases3 = [];
  talukas = [];
  villeges = [];
  patients = [];
  startDate : any;

  getCampaignDetails(id){

    this.doctorService.getCampaignDetails(id)
    .subscribe(
      data =>{
       
        this.diseases1.push(data.campaign.disease1);
        this.diseases2.push(data.campaign.disease2);
        this.diseases3.push(data.campaign.disease3);
  
      },
      error => console.log(error)
    )
  }

  getTalukaAndVilleges(id){

    this.doctorService.getTalukaAndVilleges(id)
    .subscribe(
      data => {
        this.villeges = data.result.villeges;
        this.talukas.push(data.result.taluka);
      },
      error => console.log(error)
    )
  }

  onSubmit(form){

    const patient : Patient = {
      firstName : form.value.firstName,
      middleName : form.value.middleName,
      lastName : form.value.lastName,
      aadharNo : form.value.aadharNo,
      mobileNo : form.value.mobileNo,
      visitDate : form.value.visitDate,
      disease1 : form.value.disease1,
      disease2 : form.value.disease2,
      disease3 : form.value.disease3,
      district : form.value.district,
      taluka : form.value.taluka,
      villege : form.value.villege,
      treatment : form.value.treatment,
      cure : false
    }

    const id = this.route.snapshot.params['id'];

    this.doctorService.addPatient(id,patient)
    .subscribe(
      data => {
        console.log(data);
        this.getListOfPatients(id);
      },
      error => console.log(error)
    )

    form.resetForm();

  }

  getListOfPatients(id){

    this.doctorService.getListOfPatients(id)
    .subscribe(
      data => {
        this.patients = data.patients.patients;
      },
      error => console.log(error)
    )
  }

  deletePatient(id){

    this.doctorService.deletePatient(id)
    .subscribe(
      data =>{
        if(data.result.n==1){
          for(let i=0;i<this.patients.length;i++){
            if(id == this.patients[i]._id){
              this.patients.splice(i,1);
            }
          }
      }
    },
    error => console.log(error)
    )
  }



}
