import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users:User[]=[]
  @Input()isChat:boolean=false
  @Output() userclick=new EventEmitter();

  query:string=''
  currUser!:User
  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    if(this.isChat){
      let currUserId=this.auth.getUserId();
      if(currUserId){
        this.api.messageObs.subscribe((data:User)=>{
            //.............. TODO .........................
        })
        this.api.getUserByid(currUserId).subscribe((data:any)=>{
          this.currUser=data;
        })
      }
    }
  }

  onClickUser(user:User){
    this.userclick.emit(user);
  }
  getProfile(i:number){
    return this.users[i].profileurl ? this.users[i].profileurl : this.api.profileurl;
  }
  isNewMessage(user:User){
    if(this.currUser){
      return this.currUser.messageids.indexOf(user.userid)>=0;
    }else{
      return false;
    }
  }

}
