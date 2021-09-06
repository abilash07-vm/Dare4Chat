import { Output,EventEmitter, ChangeDetectorRef } from '@angular/core';
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
  @Output() back=new EventEmitter();
  @Output() update=new EventEmitter();

  allMessages:DateMessage[]=[]
  curr_message:string=''
  curr_userid!:string
  newMessages:DateMessage | undefined
  constructor(private api:ApiService,
    private auth:AuthService,
    private changeDetection: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.curr_userid=userid
      this.getMessages()
      this.socketMethod()
      this.api.removeMessageidFromUser(this.user.userid,this.curr_userid).subscribe((data)=>{
        console.log(data);
      })
    }
  }

  socketMethod(){

    // socket
    this.api.messageObs.subscribe((newMessage)=>{
      console.log('inside message page',newMessage);
      this.addNewMessage(newMessage)
      this.changeDetection.detectChanges()
    })
  }
  addNewMessage(message:Message){
    if(this.newMessages){
      this.newMessages.messages.push(message);
    }else{
      this.newMessages={
        "date": message.date,
        "messages":[message]
      }
    }
  }

  getMessages(){
    this.api.getMessageByUserId(this.user.userid).subscribe((data:any)=>{
      this.segregateByDate(data);
    })
  }
  segregateByDate(messages:Message[]){
    for(let msg of messages){
      if(msg.isRead){
        this.addToAllMessage(msg);
      }else{
        this.addNewMessage(msg);
        this.api.updateMessageById(msg.messageid).subscribe((data)=>{
          console.log(data);
        })
      }
     
    }
  }
  addToAllMessage(msg:Message){
    let len=this.allMessages.length
      if(len==0 || this.api.isDifferentDay(new Date(this.allMessages[len-1].date),new Date(msg.date))){
        this.allMessages.push({"date":msg.date,"messages":[msg]})
      }else{
        this.allMessages[len-1].messages.push(msg);
        console.log(msg);
        
      }
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
      "type":'text',
      "date": new Date(),
      "isRead": false,
      "messageid": '12345'
    }
    
    this.api.addMessage(message).subscribe((data:any)=>{
      this.curr_message=''
      if(this.newMessages){
        this.newMessages.messages.forEach((msg)=>{
          this.addToAllMessage(msg);
        })
        this.newMessages=undefined
      }
      this.api.addMessageidToUser(this.curr_userid,this.user.userid).subscribe((data)=>{
        console.log(data);
        this.update.emit(this.user)
      })
      this.addToAllMessage(data)
    })
  }

  onGoBack(){
    this.back.emit();
  }

}


