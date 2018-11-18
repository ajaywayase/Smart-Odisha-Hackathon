import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class SignupService {

  constructor(private http :Http,
    private errorService: ErrorService) { }


  getTalukas(district:String){

    return this.http.get('http://localhost:3000/signup/getTalukas/'+district)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }

  getVilleges(taluka : String){

    return this.http.get('http://localhost:3000/signup/getVilleges/'+taluka)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }

  signupUser(user){

    const body = JSON.stringify(user);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/signup/user/',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  signupDoctor(doctor){

    const body = JSON.stringify(doctor);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/signup/doctor/',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  signupFcr(fcr){

    const body = JSON.stringify(fcr);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/signup/fcr/',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }




}
