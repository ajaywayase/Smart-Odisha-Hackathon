import { Component, OnInit } from '@angular/core';
import {FcrService} from '../../services/fcr.service';
import {Messages} from '../../model/sendMessage';
import {SigninService} from '../../services/signin.service';

@Component({
  selector: 'app-frc-send-messages',
  templateUrl: './frc-send-messages.component.html',
  styleUrls: ['./frc-send-messages.component.css']
})
export class FrcSendMessagesComponent implements OnInit {

  constructor(
    private fcrService : FcrService,
    private signinService : SigninService
  ) { }

  ngOnInit() {
    this.getLoggedInUser();
  }

  users = []
  mobileNo =[];
  taluka : String = '';

  getListOfUsers(taluka){ 
    this.fcrService.getListOfUsers(taluka)
    .subscribe(
      data =>{
        this.users = data.users;
        this.mobileNo = data.mobileNo;
      },
      error => console.log(error)
    )
  }

  getLoggedInUser(){

    this.signinService.getLoggedInUser()
    .subscribe(
      data =>{
        this.taluka = data.user.taluka;
        this.getListOfUsers(this.taluka);
      },
      error => console.log(error)
    )
  }

  

  onSend(form){

    const message : Messages = {
      msg:form.value.msg,
      numbers:this.mobileNo
    }
    
    this.fcrService.sendMessages(message)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
    form.resetForm();
  }
  
}
