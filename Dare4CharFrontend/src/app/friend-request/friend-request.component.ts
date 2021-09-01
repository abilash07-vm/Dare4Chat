import { Component, OnInit } from '@angular/core';
import { RequestRecieved, User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  userReqList:User[]=[]

  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.api.getUserReceivedFriendRequest(userid).subscribe((data:any)=>{
        if(data){
          let userreq:RequestRecieved=data;
          this.getUsersByids(userreq.receivedids);
        }
        
      })
    }
  }

  getUsersByids(ids:string[]){
    
    ids.forEach((userid)=>{
      this.api.getUserByid(userid).subscribe((data:any)=>{
        this.userReqList.push(data);
      })
    })

  }

  // onClickUser(user:User){

  // }

  getProfile(user:User){
    return user?.profileurl ? user.profileurl: this.api.profileurl;
  }

  onAccept(user:User){

  }

  onReject(user:User){
  }
}
