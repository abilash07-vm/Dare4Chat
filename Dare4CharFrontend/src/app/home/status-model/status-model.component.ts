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
  @Output() prev=new EventEmitter();
  @Output() next=new EventEmitter();

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

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getDateInWords(){
    let statusDate:Date=new Date(this.userStatus.statuses[this.currIndex].date);
    let diff=new Date().getTime()- statusDate.getTime()
    let aDay=24*60*60*1000
    // let statusid=this.userStatus.statuses[this.currIndex].statusid
    // if(diff>aDay && statusid){
    //   this.api.deleteStatusById(statusid).subscribe((data)=>{
    //     
    //   })
    // }
    return this.api.getDateDiffInWord(diff);
  }

  onCurrentNext(){
    this.time=0
    this.currIndex+=1
    if(this.currIndex>=this.maxIndex){
      this.refreshInterval()
      this.currIndex=0
      this.next.emit(true);
    }
  }

  onCurrentPrev(){
    this.time=0
    if(this.currIndex>0){
      this.currIndex-=1
      this.next.emit(true);
    }else{
      this.refreshInterval()
      this.currIndex=0
      this.prev.emit(true);
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
      this.time=0;
      this.onCurrentNext();
    }
  }

  onTouch(when: string, touch: TouchEvent) {
    let touchVal= this.swipeService.getSwipe(when, touch,1,3,true);
    if(touchVal==-1){
      
      this.refreshInterval()
      this.stop.emit(true);
    }else if(touchVal==0){
      this.refreshInterval()
      this.currIndex=0
      this.prev.emit(true);
    }else if(touchVal==2){
      
      this.refreshInterval()
      this.currIndex=0
      this.next.emit(true);
    }
  }

  onDrag(when: string, drag: MouseEvent) {
    let touchVal= this.swipeService.getMouseSwipe(when, drag,1,3,true);
    if(touchVal==-1){
      
      this.refreshInterval()
      this.stop.emit(true);
    }else if(touchVal==0){
      
      this.refreshInterval()
      this.prev.emit(true);
    }else if(touchVal==2){
      
      this.refreshInterval()
      this.next.emit(true);
    }
  }
  refreshInterval(){
    clearInterval(this.intervalId)
    this.intervalId=''
    this.time=0
  }

  getProfileUrl(){
    return this.userStatus.user.profileurl ? this.userStatus.user.profileurl : this.api.profileurl; 
  }

}
