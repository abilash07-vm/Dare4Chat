import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
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
    }else{
      this.type='other'
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
