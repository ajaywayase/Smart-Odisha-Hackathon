import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class UserService {

  constructor(
    private http : Http,
    private errorService : ErrorService
  ) { }


getCampaigns(){

  return this.http.get('http://localhost:3000/user/campaigns')
  .map((res:Response) => res.json())
  .catch((err:Response)=>{
    this.errorService.handleError(err.json());
    return Observable.throw(err.json())
  });

}


}
