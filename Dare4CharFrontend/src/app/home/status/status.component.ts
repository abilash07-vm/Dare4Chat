import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status:any=[]
  @Output() isStatus=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    this.showStatus();
  }

  showStatus(){
    console.log('calling show status func');
    this.isStatus.emit(true);
  }

}
