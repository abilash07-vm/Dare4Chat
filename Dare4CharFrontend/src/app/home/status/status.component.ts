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

  onStatusShow(i:number){
    this.currIndex=i;
    this.show=true;
  }

  onStop(isstop:boolean){
    
    this.currIndex=-1;
    this.show=false;
  }

  onNext(isnext:boolean){
    this.currIndex+=1
    console.log('onNext is called ',this.currIndex);
    if(this.currIndex>=this.statuses.length){
      this.onStop(true)
    }else{
      
    }
  }

  onPrev(isprev:boolean){
    
    if(this.currIndex>0){
      this.currIndex-=1
    }else{
      this.currIndex=-1
      this.show=false
    }
  }


  getDate(date:Date){
    return new Date().getTime() - date.getTime();
  }

  getProfile(i:number){
    return this.statuses[i].user.profileurl ? this.statuses[i].user.profileurl : this.api.profileurl;
  }

}
