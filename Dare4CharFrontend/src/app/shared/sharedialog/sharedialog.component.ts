import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.css']
})
export class SharedialogComponent implements OnInit {
  loc: string[] = [];
  users:User[]=[]
  constructor(private auth:AuthService,private api:ApiService) { }

  ngOnInit(): void {
    let userLoc=this.auth.getUser();
    if(userLoc){
      let user:User=JSON.parse(userLoc);
      user.friendsids.forEach((friend)=>{
        this.api.getUserByid(friend).subscribe((data:any)=>{
          this.users.push(data);
        })
      })
    }
    
  }

  getProfile(user:User){
    return user.profileurl ? user.profileurl: this.api.profileurl;
  }

  onCheck(user:User){
    let ind=this.loc.indexOf(user.userid)
    if(ind>=0){
      this.loc.splice(ind,1);
    }else{
      this.loc.push(user.userid);
    }
  }

}
