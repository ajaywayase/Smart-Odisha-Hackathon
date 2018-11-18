import { Component, OnInit } from '@angular/core';
import { FcrService} from '../../services/fcr.service';
import { Count} from '../../model/count';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(
    private fcrService : FcrService
  ) {
   
   }

  ngOnInit() {

  }

  latitude = 20.9517;
  longitude = 85.0985;
  locationChosen = false;
  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

  lat: number;
  lng: number;
  radius : number = 15000;
  color : any;
  // circle = [
  //   {lat: 20.2961, lng: 85.8245, radius: 35000, color: 'red'},
  //   {lat:19.9246, lng: 85.3966, radius: 35000, color: '#551A8B'},
  // ];

  onSubmit(form){

    const patients : Count = {
      taluka : form.value.taluka,
      disease : form.value.disease
    }
    if(form.value.taluka == 'bhubaneswar'){
      this.lat =  20.2961;
      this.lng = 85.8245
    }
    if(form.value.taluka =='tangi'){
      this.lat = 19.9246;
      this.lng = 85.3966;
    }
    this.color = null;
    
    this.fcrService.getCountOfPatients(patients)
    .subscribe(
      data => {
        console.log(data.count)
        
        if(data.count == 1 ){
          this.color = 'green';
        }
        else if(data.count >=2 && data.count <4 ){
          this.color = 'yellow'
        }
        else{
          this.color = 'red'
        }
      }
    )

  }

}
