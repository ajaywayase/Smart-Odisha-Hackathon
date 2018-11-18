import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from "../errors/error.service";


@Injectable()
export class FcrService {

  constructor(
    private http:Http,
    private errorService : ErrorService
  ) { }


  getListOfHospitals(taluka){

    return this.http.get("http://localhost:3000/fcr/hospitalList/"+taluka)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  getListOfCampaigns(taluka){

    return this.http.get("http://localhost:3000/fcr/campaignList/"+taluka)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  addCampaign(campaign){

    const body = JSON.stringify(campaign);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/fcr/addCampaign',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  updateCampaign(campaign){

    const body = JSON.stringify(campaign);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.put('http://localhost:3000/fcr/updateCampaign/'+campaign._id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  deleteCampaign(id){

    return this.http.delete('http://localhost:3000/fcr/deleteCampaign/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  updateShowCampaign(campaign){

    const body = JSON.stringify(campaign);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.put('http://localhost:3000/fcr/updateShowCampaign/'+campaign._id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }

  getCountOfPatients(search){

    const body = JSON.stringify(search);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/fcr/countOfPatients',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  getListOfUsers(taluka){

    return this.http.get("http://localhost:3000/fcr/getUsers/"+taluka)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  sendMessages(message){

    const body = JSON.stringify(message);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/fcr/sendMessages',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }



}
