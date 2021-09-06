import { ChangeDetectorRef, HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Notification } from 'src/Interfaces/notification';
import { RequestRecieved, User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { ComponentCanDeactivate } from 'src/Services/pending-changes-guard.guard';

interface NotificationBackend{
  userid:string,
  notifications:Notification[]
}

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit,ComponentCanDeactivate {
  currUserId!:string
  notifications:Notification[]=[]
  users:{[userid:string]:User}={}
  reqCount: number=0;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    this.api.onOffline();
    return true;
  }


  constructor(private auth:AuthService,
    private api:ApiService,private changeDetector:ChangeDetectorRef,
    private router:Router) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.currUserId=userid;
      this.getRequestCount();
      this.api.getNotificationByuserid(userid).subscribe((data:any)=>{
        let backend_not:NotificationBackend=data
        if(backend_not){
          this.notifications=backend_not.notifications
          console.log(this.notifications);
          
          this.updateNotificationNavbarCount();
          this.updateNotificationMessageArr();
          this.updateNewNotificationFromSocket();
          this.notifications.reverse()
        }
      })
    }
  }

  updateNotificationNavbarCount(){
    this.notifications.forEach((notification)=>{
      if(!notification.read){
        this.api.updateReadNotification(notification).subscribe(()=>{});
      }
    })
    this.api.updateNotificationInbottomNavBar(true);
  }

  updateNotificationMessageArr(){
    for(let i=0;i<this.notifications.length;i++){
      this.updateNotificationMessage(i);
    }
  }
  updateNewNotificationFromSocket(){
    this.api.notificationObs.subscribe((data:any)=>{
      this.notifications.unshift(data);
      if(this.notifications[this.notifications.length-1].type==='request'){
        this.reqCount+=1
      }
      this.updateNotificationMessage(0);
      this.updateNotificationNavbarCount();
      this.changeDetector.detectChanges();

    })
  }
  updateNotificationMessage(ind:number){    
    let profile_userid=this.notifications[ind].userid;
    if(!this.users[profile_userid]){
      this.api.getUserByid(profile_userid).subscribe((user:any)=>{
        this.users[profile_userid]=user;
        this.updateNotificationMessage(ind)
      })
    }else{
      let type=this.notifications[ind].type;
      let user=this.users[this.notifications[ind].userid]
      if(type==='request'){
        this.notifications[ind].message=`${user.username} has sent you a friend request`
      }else if(type==='accepted'){
        this.notifications[ind].message=`${user.username} has accepted your friend request`
      }else if(type==='like'){
        this.notifications[ind].message=`${user.username} liked your post.\nclick here to view`
      }else if(type==='comment'){
        this.notifications[ind].message=`${user.username} commented your post.\nclick here to view`
      } 
      
    }

  }

  getRequestCount(){
    this.api.getUserReceivedFriendRequest(this.currUserId).subscribe((data:any)=>{
      let receiedReq:RequestRecieved=data;
      this.reqCount=receiedReq.receivedids.length;
    })
  }
  
  onNotificationClick(notification:Notification){
    if(notification.postid){
      this.router.navigate(['/','post',notification.postid]);
    }else{
      this.router.navigate(['/','profileid',notification.userid]);
    }
  }

  getProfile(userid:string){
    return this.users[userid].profileurl ? this.users[userid].profileurl : this.api.profileurl;
  }
  getDate(date:Date){
    return this.api.getDateDiffInWord(this.api.getDateDiffFromNowInMS(date));
  }

}
