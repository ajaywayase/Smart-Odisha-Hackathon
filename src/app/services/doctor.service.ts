import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class DoctorService {

  constructor(
    private http:Http,
    private errorService : ErrorService
  ) { }

  patientListOnInit = [];


  getCampaigns(){

    return this.http.get('http://localhost:3000/doctor/campaigns')
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  getCampaignDetails(id){

    return this.http.get('http://localhost:3000/doctor/campaignInfo/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  getTalukaAndVilleges(id){

    return this.http.get('http://localhost:3000/doctor/getTalukaAndVilleges/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  addPatient(id,patient){

    const body = JSON.stringify(patient);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/doctor/addPatient/'+id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }


  getListOfPatients(id){

    return this.http.get('http://localhost:3000/doctor/getPatients/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
      
  }

  deletePatient(id){

    return this.http.delete('http://localhost:3000/doctor/deletePatient/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  getTalukaPatients(taluka){

    return this.http.get('http://localhost:3000/doctor/getTalukaPatients/'+taluka)
    .map((res:Response) => {
      this.patientListOnInit = res.json().patients;
       return res.json()
    })
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  patientsOnInit(){

    return this.patientListOnInit;
  }
 
  getPatientInfo(id){

    return this.http.get('http://localhost:3000/doctor/patientInfo/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  updatePatient(patient){
    const body = JSON.stringify(patient);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.put('http://localhost:3000/doctor/updatePatient/'+patient._id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }

  getCountOfPatients(taluka){

    return this.http.get('http://localhost:3000/doctor/count/'+taluka)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }









}
