import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class SigninService {

  constructor(private http : Http,
              private errorService : ErrorService) { }


  signinUser(user){

    const body = JSON.stringify(user);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/signin/user/',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }

  signinDoctor(doctor){

    const body = JSON.stringify(doctor);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/signin/doctor/',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  signinFcr(fcr){

    const body = JSON.stringify(fcr);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/signin/fcr/',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });

  }

  getLoggedInUser(){

    const userId = localStorage.getItem('userId');

    return this.http.get("http://localhost:3000/signin/loggedInUser/"+userId)
    .map((res:Response) => res.json())
    .catch((err:Response)=>{
      this.errorService.handleError(err.json());
      return Observable.throw(err.json())
    });
  }


}
