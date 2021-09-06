import { Component, HostListener, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { Observable } from 'rxjs';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
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
      this.api.onOffline();
      return true;
    }
  constructor(private api:ApiService,
    private auth:AuthService) { }
  isStatus:boolean=false
  currTabInd:number=0
  chatCount=0

  ngOnInit(): void {
    let tabname=this.auth.getLatTab() || 0;
    console.log('last tab ng in it',tabname);
    
    if(tabname=='Chat'){
      this.currTabInd=1;
    }else if(tabname=='Status'){
      this.currTabInd=2;
    }else{
      this.currTabInd=0;
    }
  }
  
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.auth.setLastTab(tabChangeEvent.tab.textLabel)
    if(tabChangeEvent.index==2){
      this.isStatus=true
    }
  }

  onStatusView(isStatus:boolean){
    
  }

  incrementChatCount(){
    this.chatCount+=1;
    this.api.setValueToHomeForChatCount(this.chatCount);
  }
  decrementChatCount(){
    this.chatCount-=1;
    this.api.setValueToHomeForChatCount(this.chatCount);
  }

}
