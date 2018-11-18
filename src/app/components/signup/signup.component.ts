import { Component, OnInit } from '@angular/core';
import {SignupService} from '../../services/signup.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import { Doctor} from '../../model/doctor';
import { Fcr} from '../../model/fcr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService : SignupService,
              private router : Router) { }

  ngOnInit() {

    this.getTalukas();

  }

  talukas=[];
  villeges=[];
  
  
  getTalukas(){
    this.signupService.getTalukas("khorda")
    .subscribe(
      data => {this.talukas = data.talukas;
        },
     // error => console.log(error)
    )
  }

  getVilleges(taluka){
    
    this.signupService.getVilleges(taluka)
    .subscribe(
      data => {
        this.villeges = [];
        this.villeges = data.villeges;
        },
     // error => console.log(error)
    )
    
  }

  onSubmitUser(form){

    const user : User = {
      firstName : form.value.firstName,
      middleName : form.value.middleName,
      lastName : form.value.lastName,
      district : form.value.district,
      taluka : form.value.taluka,
      villege : form.value.villege,
      aadharNo : form.value.aadharNo,
      mobileNo : `+91${form.value.mobileNo}`,
      password : form.value.password
    }

    this.signupService.signupUser(user)
    .subscribe(
      data =>{
        console.log(data);
        this.router.navigateByUrl('/');},
      error =>  console.log(error)
    )

    form.resetForm();
  }

  onSubmitDoctor(form){

    const doctor : Doctor = {
      firstName : form.value.firstName,
      lastName : form.value.lastName,
      uid : form.value.uid,
      password : form.value.password
    }

    this.signupService.signupDoctor(doctor)
    .subscribe(
      data =>{
        console.log(data);
        this.router.navigateByUrl('/');},
      error =>  console.log(error)
    )

    form.resetForm();

  }

  onSubmitFcr(form){

    const fcr : Fcr = {
      firstName : form.value.firstName,
      lastName : form.value.lastName,
      uid : form.value.uid,
      password : form.value.password
    }

    this.signupService.signupFcr(fcr)
    .subscribe(
      data =>{
        console.log(data);
        this.router.navigateByUrl('/');},
      error =>  console.log(error)
    )

    form.resetForm();

    

  }


}
