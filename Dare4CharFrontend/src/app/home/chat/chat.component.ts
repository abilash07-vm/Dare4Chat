import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users:User[]=[]
  selected_user!:User

  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    let user=this.auth.getUser();
    if(user){
      let currUser:User=JSON.parse(user);
      currUser.friendsids.forEach((friendid)=>{
        this.api.getUserByid(friendid).subscribe((friend:any)=>{
          this.users.push(friend);
        })
      })
    }
  }

  onUserClick(user:any){
    console.log(user);
    this.selected_user=user;
  }

}
