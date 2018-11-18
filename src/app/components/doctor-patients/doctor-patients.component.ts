import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.css']
})
export class DoctorPatientsComponent implements OnInit {

  constructor(
    private doctorService : DoctorService
  ) { }

  ngOnInit() {

    this.patientsOnInit();
  }

  patients = [];

  onSubmit(form){

    this.doctorService.getTalukaPatients(form.value.taluka)
    .subscribe(
      data => {
        this.patients = data.patients;
      },
      error => console.log(error)
    )

  }

  patientsOnInit(){

    this.patients = this.doctorService.patientsOnInit();
  }

}
