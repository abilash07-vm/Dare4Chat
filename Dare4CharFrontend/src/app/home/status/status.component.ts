import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatusUser } from 'src/Interfaces/status';
import { ApiService } from 'src/Services/api.service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  currIndex:number=-1
  statuses:StatusUser[]=[]
  show:boolean=false
  @Output() isStatus=new EventEmitter()
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.showStatus();
  }

  showStatus(){
    console.log('calling show status func');
    this.isStatus.emit(true);
  }

  getDate(date:Date){
    return new Date().getTime() - date.getTime();
  }

}
