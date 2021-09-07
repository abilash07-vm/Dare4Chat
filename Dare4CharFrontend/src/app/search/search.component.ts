import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestRecieved, RequestSent, User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { ComponentCanDeactivate } from 'src/Services/pending-changes-guard.guard';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,ComponentCanDeactivate {
  users:User[]=[]
  user:User | undefined
  type:string | undefined
  constructor(private api:ApiService,private auth:AuthService) { }

  @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
      // insert logic to check if there are pending changes here;
      // returning true will navigate without confirmation
      // returning false will show a confirm dialog before navigating away
      this.api.onOffline();
      return true;
    }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data:any)=>{
      this.users=data
    })
  }
  onProfileClick(user:User){
    this.user=user;
    let currUserid=this.auth.getUserId()
    if(!user.userid){
      return;
    }else if(currUserid===user.userid){
      this.type='me';
    }else if(currUserid && user.friendsids.indexOf(currUserid)>=0){
      this.type='friend'
    }else if(currUserid){
      this.type='other'
      this.api.getUserSentFriendRequest(currUserid).subscribe((data:any)=>{
        
        if(data){
          let requestSent:RequestSent=data;
          if(requestSent.sentids.indexOf(user.userid)>=0){
            this.type='requestSent'
          }
        }
      })
      this.api.getUserReceivedFriendRequest(currUserid).subscribe((data:any)=>{
        
        if(data){
          let requestRecieved:RequestRecieved=data;
          if(requestRecieved.receivedids.indexOf(user.userid)>=0){
            this.type='requestRecieved'
          }
        }
      })
    }
  }
  onGoBack(){
    this.type=undefined
    this.user=undefined
  }
  onRefresh(user:User){
    this.api.getUserByid(user.userid).subscribe((data:any)=>{
      this.onProfileClick(data);
      this.auth.setUser(JSON.stringify(data));
    })
  }

  // getProfile(i:number){
  //   return this.users[i].profileurl ? this.users[i].profileurl : this.api.profileurl;
  // }

}
