import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-model',
  templateUrl: './status-model.component.html',
  styleUrls: ['./status-model.component.css']
})
export class StatusModelComponent implements OnInit {

  date:Date=new Date();
  constructor() { }

  ngOnInit(): void {
    
  }

}
