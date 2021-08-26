import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/Interfaces/notification';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

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
    private api:ApiService) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.currUserId=userid;
      this.api.getNotificationByuserid(userid).subscribe((data:any)=>{
        console.log(data);
        this.notifications=data
        this.updateNotificationMessageArr();
      })
    }
  }

  updateNotificationMessageArr(){
    for(let i=0;i<this.notifications.length;i++){
      this.updateNotificationMessage(i);
    }
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
        this.notifications[ind].message=`<strong>${user.username}</strong> has sent you a friend request`
      }else if(type==='accepted'){
        this.notifications[ind].message=`<strong>${user.username}</strong> has accepted your friend request`
      }else if(type==='like'){
        this.notifications[ind].message=`<strong>${user.username}</strong> liked your post. <br>click here to view`
      }else if(type==='comment'){
        this.notifications[ind].message=`<strong>${user.username}</strong> commented your post. <br>click here to view`
      } 
    }

  }

  getProfile(i:number){
    let profile_userid=this.notifications[i].userid;
    if(!this.users[profile_userid]){
      this.api.getUserByid(profile_userid).subscribe((user:any)=>{
        this.users[profile_userid]=user
      })
    }
    return this.users[profile_userid].profileurl ? this.users[i].profileurl : this.api.profileurl;
  }

}
