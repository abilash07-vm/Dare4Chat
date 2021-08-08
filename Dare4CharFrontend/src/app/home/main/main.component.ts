import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  isStatus:boolean=false

  ngOnInit(): void {
  }
  
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if(tabChangeEvent.index==2){
      this.isStatus=true
    }
  }

  onStatusView(isStatus:boolean){
    
  }

}
