import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-campaigns',
  templateUrl: './doctor-campaigns.component.html',
  styleUrls: ['./doctor-campaigns.component.css']
})
export class DoctorCampaignsComponent implements OnInit {

  constructor(
    private doctorService : DoctorService
  ) { }

  ngOnInit() {

    this.getCampaigns();
  }

  campaignsList =[];

  getCampaigns(){
    this.doctorService.getCampaigns()
    .subscribe(
      data => {
        this.campaignsList = data.campaigns;
      },
      error => console.log(error)
    )
  }

}
