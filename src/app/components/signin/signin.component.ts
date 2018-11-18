import { Component, OnInit } from '@angular/core';
import { login } from '../../model/signin';
import {SigninService} from '../../services/signin.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private signInService : SigninService,
            private router : Router) { }

  ngOnInit() {

  }

  onSubmitUser(form){

    const user : login = {
      mobileNo : form.value.mobileNo,
      password : form.value.password
    }

    this.signInService.signinUser(user)
    .subscribe(
      data => {
          localStorage.setItem('token',data.token);
          localStorage.setItem('userId',data.userId);
        console.log(data);
        this.router.navigateByUrl('/user')
      },
      error => console.log(error)
    )
    form.resetForm();
  }

  onSubmitDoctor(form){

    const doctor  : login ={
      uid : form.value.uid,
      password : form.value.password
    }

    this.signInService.signinDoctor(doctor)
    .subscribe(
      data => {
          localStorage.setItem('token',data.token);
          localStorage.setItem('userId',data.userId);
        console.log(data);
        this.router.navigateByUrl('/doctor')
      },
      error => console.log(error)
    )
    form.resetForm();
  }

  onSubmitFcr(form){

    const fcr : login = {
      uid : form.value.uid,
      password : form.value.password
    }
    this.signInService.signinFcr(fcr)
    .subscribe(
      data => {
          localStorage.setItem('token',data.token);
          localStorage.setItem('userId',data.userId);
        this.router.navigateByUrl('/fcr')
      },
      error => console.log(error)
    )
    form.resetForm();
  }



}
