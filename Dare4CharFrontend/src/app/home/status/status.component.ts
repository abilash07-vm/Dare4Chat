import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Status, StatusUser } from 'src/Interfaces/status';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  currIndex:number=-1
  statuses:StatusUser[]=[]
  show:boolean=false
  @Output() isStatus=new EventEmitter()
  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    // this.showStatus();
    let struser=this.auth.getUser();
    if(struser){
      let user:User=JSON.parse(struser);
      let userids=user.friendsids
      userids.push(user.userid);
      userids.forEach((userid:string)=>{
        this.api.getStatusByUserId(userid).subscribe((data:any)=>{
          let statusArr:Status[]=data;
          this.api.getUserByid(userid).subscribe((user:any)=>{
            this.statuses.push({"user":user,"statuses":statusArr});
          })
        })
      })
      
    }
  }

  showStatus(){
    console.log('calling show status func');
    this.isStatus.emit(true);
  }

  onStatusShow(i:number){
    this.currIndex=i;
    this.show=true;
  }

  onStop(){
    console.log('invoved on stop in status component');
    
    this.show=false;
  }

  getDate(date:Date){
    return new Date().getTime() - date.getTime();
  }

}
