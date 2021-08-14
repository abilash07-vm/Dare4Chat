import { Component, HostListener, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { Observable } from 'rxjs';
import { ApiService } from 'src/Services/api.service';
import { ComponentCanDeactivate } from 'src/Services/pending-changes-guard.guard';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,ComponentCanDeactivate {

  @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
      // insert logic to check if there are pending changes here;
      // returning true will navigate without confirmation
      // returning false will show a confirm dialog before navigating away
      this.api.onOffline()
      return false;
    }
  constructor(private api:ApiService) { }
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
