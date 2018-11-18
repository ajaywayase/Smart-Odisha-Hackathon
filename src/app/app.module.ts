import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AgmCoreModule } from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Services
import { SignupService } from './services/signup.service';
import {SigninService} from './services/signin.service';
import { ErrorService } from "./errors/error.service";
import { FcrService} from './services/fcr.service';
import { DoctorService} from './services/doctor.service';
import {UserService} from './services/user.service';
import {AuthServiceService} from './services/auth-service.service'

//Components
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { FCRComponent } from './components/fcr/fcr.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { UserComponent } from './components/user/user.component';
import { FcrAddCampaignComponent } from './components/fcr-add-campaign/fcr-add-campaign.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { FcrHomeComponent } from  './components/fcr-home/fcr-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { MapComponent } from './components/map/map.component';
import { GraphComponent } from './components/graph/graph.component';
import { ErrorComponent } from "./errors/error.component";
import { DoctorCampaignsComponent } from './components/doctor-campaigns/doctor-campaigns.component';
import { DoctorCampaignPatientComponent } from './components/doctor-campaign-patient/doctor-campaign-patient.component';
import { DoctorPatientsComponent } from './components/doctor-patients/doctor-patients.component';
import { DoctorPatientDetailsComponent } from './components/doctor-patient-details/doctor-patient-details.component';
import { FrcSendMessagesComponent } from './components/frc-send-messages/frc-send-messages.component';
import { UserDiseasesInfoComponent } from './components/user-diseases-info/user-diseases-info.component';


const appRoutes : Routes = [
  
  {path:'',component:SigninComponent},
  {path:'signup',component:SignupComponent},

  //FCR and its child routes
  {path:'fcr',component:FCRComponent,
  children:[
    {path:'',component:FcrHomeComponent},
    {path:'addCampaign',component:FcrAddCampaignComponent},
    {path:'map',component:MapComponent},
    {path:'graph',component:GraphComponent},
    {path:'sendMessage',component:FrcSendMessagesComponent}
  ]},

  //Doctor and its child routes
  {path:'doctor',component:DoctorComponent,
  children:[
    {path:'',component:DoctorHomeComponent},
    {path:'campaigns',component:DoctorCampaignsComponent},
    {path:'campaignPatients/:id',component:DoctorCampaignPatientComponent},
    {path : 'patientDetail/:id',component:DoctorPatientDetailsComponent},
    {path :'patients',component:DoctorPatientsComponent},
    {path:'map',component:MapComponent},
    {path:'graph',component:GraphComponent}
  ]},

  //User and its child routes
  {path:'user',component:UserComponent,
  children:[
    {path:'',component:UserHomeComponent},
    {path:'map',component:MapComponent},
    {path:'graph',component:GraphComponent},
    {path:'diseasesInfo',component:UserDiseasesInfoComponent}
  ]}
]


@NgModule({
  declarations: [
    AppComponent,SigninComponent,SignupComponent,FCRComponent,DoctorComponent,
    UserComponent,DoctorHomeComponent,FcrHomeComponent,UserHomeComponent,
    FcrAddCampaignComponent,ErrorComponent,
    MapComponent,
    GraphComponent,
    DoctorCampaignsComponent,
    DoctorCampaignPatientComponent,
    DoctorPatientsComponent,
    DoctorPatientDetailsComponent,
    FrcSendMessagesComponent,
    UserDiseasesInfoComponent,
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),
    FormsModule,Ng2SearchPipeModule,NgDatepickerModule,
    HttpModule,NgxPaginationModule,NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBDwvFb9bHhDOt86pvqcfYvDn-PyD5tRXU'
    }), 

  ],
  providers: [
    SignupService,SigninService,ErrorService,FcrService,DoctorService,
    UserService,AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
