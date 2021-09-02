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
  currUserid!:string

  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.currUserid=userid;
      this.userReqList=[]
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
    this.api.addFriendid(this.currUserid,user.userid).subscribe((data)=>{
      console.log('onAccept 1',data);
      this.api.addFriendid(user.userid,this.currUserid).subscribe((data)=>{
        console.log('onAccept 2',data);
        this.ngOnInit()
      })
      
    })
  }

  onReject(user:User){
    this.api.cancelFriendRequest(this.currUserid,user.userid).subscribe((data)=>{
      console.log('request rejected',data);
      this.ngOnInit()
    })
  }
}
