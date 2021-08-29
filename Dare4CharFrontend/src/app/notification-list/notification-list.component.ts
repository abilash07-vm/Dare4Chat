import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/Interfaces/notification';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

interface NotificationBackend{
  userid:string,
  notifications:Notification[]
}

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  currUserId!:string
  notifications:Notification[]=[]
  users:{[userid:string]:User}={}
  constructor(private auth:AuthService,
    private api:ApiService,private changeDetector:ChangeDetectorRef) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.currUserId=userid;
      this.api.getNotificationByuserid(userid).subscribe((data:any)=>{
        let backend_not:NotificationBackend=data
        console.log(backend_not);
        if(backend_not){
          this.notifications=backend_not.notifications
          console.log(this.notifications);
          
          this.updateNotificationMessageArr();
          this.updateNewNotificationFromSocket();
        }
      })
    }
  }

  updateNotificationMessageArr(){
    for(let i=0;i<this.notifications.length;i++){
      this.updateNotificationMessage(i);
    }
  }
  updateNewNotificationFromSocket(){
    this.api.notificationObs.subscribe((data:any)=>{
      this.notifications.push(data);
      console.log(data);
      this.updateNotificationMessage(this.notifications.length-1);
      this.changeDetector.detectChanges();

    })
  }
  updateNotificationMessage(ind:number){    
    let profile_userid=this.notifications[ind].userid;
    if(!this.users[profile_userid]){
      this.api.getUserByid(profile_userid).subscribe((user:any)=>{
        this.users[profile_userid]=user;
        console.log(this.users);
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
      console.log(this.notifications);
      
    }

  }

  getProfile(i:number){
    let profile_userid=this.notifications[i].userid;
    if(!this.users[profile_userid]){
      this.api.getUserByid(profile_userid).subscribe((user:any)=>{
        this.users[profile_userid]=user
      })
    }
    return this.users[profile_userid]?.profileurl ? this.users[profile_userid].profileurl : this.api.profileurl;
  }
  getDate(date:Date){
    return this.api.getDateDiffInWord(this.api.getDateDiffFromNowInMS(date));
  }

}
