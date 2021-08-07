import { Component, Input, OnInit, Output ,EventEmitter, OnChanges} from '@angular/core';
import { StatusUser } from 'src/Interfaces/status';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { TouchSwipeService } from 'src/Services/touch-swipe.service';

@Component({
  selector: 'app-status-model',
  templateUrl: './status-model.component.html',
  styleUrls: ['./status-model.component.css']
})
export class StatusModelComponent implements OnInit,OnChanges {
  time:number=0
  @Input('userstatus') userStatus!:StatusUser
  @Output() stop=new EventEmitter();
  @Output() next=new EventEmitter();

  date:Date=new Date();
  currIndex=0
  maxIndex=0
  intervalId:any
  constructor(private swipeService:TouchSwipeService,
    private api:ApiService,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.maxIndex=this.userStatus.statuses.length;
    this.intervalId=setInterval(()=>{
      this.setTime()
    },400)
  }

  ngOnChanges(){
    if(this.intervalId==''){
      this.intervalId=setInterval(()=>{
        this.setTime()
      },400)
      this.maxIndex=this.userStatus.statuses.length
    }
  }

  updateStatusView(){
    let userid=this.auth.getUserId()
    if(userid && this.currIndex>=0 && this.currIndex<this.maxIndex){
      this.userStatus.statuses[this.currIndex].viewsids.push(userid);
      this.api.updateStatus(this.userStatus.statuses[this.currIndex])
    }
  }
  
  setTime(){
    this.time+=10;
    if(this.time>100){
      console.log('current index',this.currIndex,'user',this.userStatus.user);
      this.time=0;
      this.currIndex+=1
      if(this.currIndex>=this.maxIndex){
        clearInterval(this.intervalId)
        this.intervalId=''
        this.next.emit(true);
        this.currIndex=0;
      }
    }
  }

  onTouch(when: string, touch: TouchEvent) {
    let touchVal= this.swipeService.getSwipe(when, touch,this.currIndex,this.maxIndex+1,true);
    if(touchVal==-1){
      console.log('exit');
      clearInterval(this.intervalId)
      this.intervalId=''
      this.stop.emit(true);
    }else{
      this.currIndex=touchVal
    }
  }

  onDrag(when: string, drag: MouseEvent) {
    let touchVal= this.swipeService.getMouseSwipe(when, drag,this.currIndex,this.maxIndex+1,true);
    if(touchVal==-1){
      console.log('exit');
      clearInterval(this.intervalId)
      this.intervalId=''
      this.stop.emit(true);
    }else{
      this.currIndex=touchVal
    }
  }

  getProfileUrl(){
    return this.userStatus.user.profileurl ? this.userStatus.user.profileurl : this.api.profileurl; 
  }

}
