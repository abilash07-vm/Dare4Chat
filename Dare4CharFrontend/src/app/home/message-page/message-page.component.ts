import { Component, Input, OnInit } from '@angular/core';
import { DateMessage, Message } from 'src/Interfaces/chat';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {
  @Input() user!:User

  allMessages:DateMessage[]=[]
  curr_message:string=''
  curr_userid!:string
  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.curr_userid=userid
    }
  }

  getProfile(){
    return this.user.profileurl ? this.user.profileurl: this.api.profileurl;
  }

  onProfileClick(){
    
  }
  onMessageSend(){
    console.log('clicking!!');
    
    let message:Message={
      "from":this.curr_userid,
      "to": this.user.userid,
      "message": this.curr_message,
      "date": new Date(),
      "isRead": false,
      "messageid": '12345'
    }
    console.log('sending',message);
    
    this.api.addMessage(message).subscribe((data:any)=>{
      console.log(data);
    })
  }

}
