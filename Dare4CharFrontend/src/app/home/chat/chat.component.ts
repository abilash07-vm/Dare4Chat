import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  currUser!:User
  selected_user!:User | undefined
  @Output() inc=new EventEmitter();
  @Output() dec=new EventEmitter();

  constructor(private api:ApiService,private auth:AuthService,
    private changesDetector:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.users=[]
    let user=this.auth.getUser();
    if(user){
      this.api.setValueToHomeForChatCount(0);
      let currUser:User=JSON.parse(user);
      this.currUser=currUser;
      currUser.friendsids.forEach((friendid)=>{
        this.api.getUserByid(friendid).subscribe((friend:any)=>{
          this.users.push(friend);
          if(this.isMessageIdInCurrUser(friend)){
            this.inc.emit();
          }
          this.sortBasedOnDate()
        })
      })

    }
  }
  sortBasedOnDate(){
    
    
    this.users.sort((a,b)=>{
      return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    })
    this.changesDetector.detectChanges();
    
    
  }

  onUserClick(user:User){
    this.selected_user=user;
    if(this.isMessageIdInCurrUser(user)){
      this.dec.emit();
    }
  }

  isMessageIdInCurrUser(user:User){
    if(this.currUser.messageids.indexOf(user.userid)>=0){
      return true;
    }
    return false;
  }

  onUnselectUser(){
    this.selected_user=undefined
    window.location.reload();
  }

  onUpdate(updateUser:User){
    
  }

}
