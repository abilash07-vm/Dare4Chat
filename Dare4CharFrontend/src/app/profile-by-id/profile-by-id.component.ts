import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestRecieved, RequestSent, User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-profile-by-id',
  templateUrl: './profile-by-id.component.html',
  styleUrls: ['./profile-by-id.component.css']
})
export class ProfileByIdComponent implements OnInit {
  currUserId!:string
  user:User | undefined
  type:string | undefined

  constructor(private activatedRoute:ActivatedRoute,
    private api:ApiService,
    private auth:AuthService) { }

  ngOnInit(): void {
    let currid=this.auth.getUserId()
    if(currid){
      this.currUserId=currid
    }
    console.log('profile by id');
    
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      let userid=paramMap.get('userid');
      if(userid){
        console.log('activatedmap');
        
        this.onRefresh({userid:userid,emailid:"",username:"",postids:[],friendsids:[],isOnline: false,lastseen: new Date(),isPro:  true,bio:"",category:"",messageids:[]})
      }
    });
  }

  onGoBack(){
    this.type=undefined
    this.user=undefined
  }
  onRefresh(user:User){
    this.api.getUserByid(user.userid).subscribe((data:any)=>{
      this.onProfileClick(data);
      if(user.userid==this.currUserId)
      this.auth.setUser(JSON.stringify(data));
    })
  }


  onProfileClick(user:User){
    console.log(this.currUserId);
    console.log(user);
    
    
    if(!user.userid){
      return;
    }else if(this.currUserId===user.userid){
      this.type='me';
    }else if(this.currUserId && user.friendsids.indexOf(this.currUserId)>=0){
      this.type='friend'
    }else if(this.currUserId){
      this.type='other'
      this.api.getUserSentFriendRequest(this.currUserId).subscribe((data:any)=>{
        console.log('profile',data);
        if(data){
          let requestSent:RequestSent=data;
          if(requestSent.sentids.indexOf(user.userid)>=0){
            this.type='requestSent'
          }
        }
      })
      this.api.getUserReceivedFriendRequest(this.currUserId).subscribe((data:any)=>{
        console.log('profile-rec',data);
        if(data){
          let requestRecieved:RequestRecieved=data;
          if(requestRecieved.receivedids.indexOf(user.userid)>=0){
            this.type='requestRecieved'
          }
        }
      })
    }
    this.user=user;
  }

}
