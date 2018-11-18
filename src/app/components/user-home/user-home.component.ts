import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.getCampaigns();
  }

  campaignsList = [];
  toggle : Boolean;

  getCampaigns(){

    this.userService.getCampaigns()
    .subscribe(
      data =>{
        this.campaignsList = data.campaigns;
        if(data.campaigns.length != 0){
          this.toggle = true;
        }
        else{
          this.toggle = false;
        }
      },
      error => console.log(error)
    )
  }

}
