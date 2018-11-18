import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(
    private doctorService : DoctorService
  ) { }

  ngOnInit() {

    this.toggle = true;

  }
  toggle : Boolean;
  chart = [];

  onSubmit(form){

    this.doctorService.getCountOfPatients(form.value.taluka)
    .subscribe(
      data =>{
        this.createGraph(data.count);
      },
      error => console.log(error)
    )
  }

  
  createGraph(obj){

    this.toggle = false;

    this.chart  =  new Chart('canvas',{
      type:'bar', 
      data:{
        labels:['Asthma','Kidney Disease','Lung Disease','Diabetes','Heart Disease','Hypertension','Cancer'],
        datasets:[{
          label:'Patients',
          data:[//95,475,47,988,823,122,86
             obj['asthma'],
            obj['chronic kidney disease'],
            obj['chronic lung disease'],
            obj['diabetes'],
            obj['heart disease'],
            obj['hypertension'],
            obj['cancer']
          ],
          //backgroundColor:'green',
          backgroundColor:['#9efbff','#9efbff',
          '#9efbff','#9efbff','#9efbff'
          ,'#9efbff','#9efbff',
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }
        ]
      },
      options:{
        title:{
          display:true,
          text:"NCD's In Citizens",
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          },
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    })

  }
}
