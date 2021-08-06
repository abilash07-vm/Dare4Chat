import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { StatusUser } from 'src/Interfaces/status';
import { TouchSwipeService } from 'src/Services/touch-swipe.service';

@Component({
  selector: 'app-status-model',
  templateUrl: './status-model.component.html',
  styleUrls: ['./status-model.component.css']
})
export class StatusModelComponent implements OnInit {

  @Input('userstatus') userStatus!:StatusUser
  @Output() stop=new EventEmitter();
  date:Date=new Date();
  currIndex=0
  maxIndex=0
  constructor(private swipeService:TouchSwipeService) { }

  ngOnInit(): void {
    this.maxIndex=this.userStatus.statuses.length;
  }

  onTouch(when: string, touch: TouchEvent) {
    let touchVal= this.swipeService.getSwipe(when, touch,this.currIndex,this.maxIndex+1,true).toString();
    try{
      this.currIndex=parseInt(touchVal)
    }catch(err){
      console.log('err occured!!!');
      if(touchVal==='swipe down'){
        console.log('exit');
        this.stop.emit(true);
      }
    }
  }

  onDrag(when: string, drag: MouseEvent) {
    let touchVal= this.swipeService.getMouseSwipe(when, drag,this.currIndex,this.maxIndex+1,true).toString();
      try{
        this.currIndex=parseInt(touchVal)
      }catch(err){
        console.log('err occured!!!');
        if(touchVal==='swipe down'){
          console.log('exit');
          this.stop.emit(true);
        }
      }
  }

}
