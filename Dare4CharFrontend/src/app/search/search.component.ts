import { Component, OnInit } from '@angular/core';
import { RequestSent, User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users:User[]=[]
  user:User | undefined
  type:string | undefined
  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data:any)=>{
      this.users=data
    })
  }
  onProfileClick(user:User){
    this.user=user;
    let currUserid=this.auth.getUserId()
    if(currUserid===user.userid){
      this.type='me';
    }else if(currUserid && user.friendsids.indexOf(currUserid)>=0){
      this.type='friend'
    }else if(currUserid){
      this.api.getUserSentFriendRequest(currUserid).subscribe((data:any)=>{
        console.log('search',data);
        if(data){
          let requestSent:RequestSent=data;
          if(requestSent.sentids.indexOf(user.userid)>=0){
            this.type='requestSent'
            return;
          }
        }
        this.type='other'
      })
    }else if(currUserid){
      this.api.getUserReceivedFriendRequest(currUserid).subscribe((data:any)=>{
        console.log('search-rec',data);
        if(data){
          let requestSent:RequestSent=data;
          if(requestSent.sentids.indexOf(user.userid)>=0){
            this.type='requestRecieved'
            return;
          }
        }
        this.type='other'
      })
    }
  }
  onGoBack(){
    this.type=undefined
    this.user=undefined
  }

  getProfile(i:number){
    return this.users[i].profileurl ? this.users[i].profileurl : this.api.profileurl;
  }

}
