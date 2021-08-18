import { Output,EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { DateMessage, Message } from 'src/Interfaces/chat';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

import { io } from 'socket.io-client'
import { environment } from 'src/environments/environment';


const socket=io("http://localhost:3000/",{
  transports: ["websocket", "polling"] 
});
@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {
  @Input() user!:User
  @Output() back=new EventEmitter();

  allMessages:DateMessage[]=[]
  curr_message:string=''
  curr_userid!:string
  constructor(private api:ApiService,
    private auth:AuthService,
    ) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.curr_userid=userid
      this.getMessages()

      console.log('socket.io',this.curr_userid+"message");
      
      socket.on('message',(data:any)=>{
        console.log('socket.io',data);
      })

      socket.on('first',(data:any)=>{
        console.log('socket.io',data);
      })
    }
  }

  getMessages(){
    this.api.getMessageByUserId(this.user.userid).subscribe((data:any)=>{
      this.segregateByDate(data);
    })
  }
  segregateByDate(messages:Message[]){
    for(let msg of messages){
      this.addToAllMessage(msg);
    }
  }
  addToAllMessage(msg:Message){
    let len=this.allMessages.length
      if(len==0 || this.isDifferentDay(new Date(this.allMessages[len-1].date),new Date(msg.date))){
        this.allMessages.push({"date":msg.date,"messages":[msg]})
      }else{
        this.allMessages[len-1].messages.push(msg);
      }
  }

  isDifferentDay(date1: Date, date2: Date): boolean {
    let d1=`${date1.getDate()}/${date1.getMonth()}/${date1.getFullYear()}`
    let d2=`${date2.getDate()}/${date2.getMonth()}/${date2.getFullYear()}`
    
    if(d1===d2){

      return false
    }
    return true
  }

  getProfile(){
    return this.user.profileurl ? this.user.profileurl: this.api.profileurl;
  }

  onProfileClick(){
    
  }
  onMessageSend(){
    
    let message:Message={
      "from":this.curr_userid,
      "to": this.user.userid,
      "message": this.curr_message,
      "date": new Date(),
      "isRead": false,
      "messageid": '12345'
    }
    
    this.api.addMessage(message).subscribe((data:any)=>{
      this.curr_message=''
      this.addToAllMessage(data)
    })
  }

  onGoBack(){
    this.back.emit();
  }

}


