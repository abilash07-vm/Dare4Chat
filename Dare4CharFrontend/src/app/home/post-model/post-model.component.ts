import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/Interfaces/post';
import { TouchSwipeService } from 'src/Services/touch-swipe.service';

@Component({
  selector: 'app-post-model',
  templateUrl: './post-model.component.html',
  styleUrls: ['./post-model.component.css']
})
export class PostModelComponent implements OnInit {
  currIndex = 0;
  maxIndex = 0;

  constructor(private swipeService: TouchSwipeService) { }
  @Input('post') post!:Post
  
  ngOnInit(): void {
    
  }

  onDotClick(index:number){
    this.currIndex=index
  }

  onTouch(when: string, touch: TouchEvent) {
      this.currIndex = this.swipeService.getSwipe(when, touch,this.currIndex,this.maxIndex);
  }
  
  onDrag(when: string, drag: MouseEvent) {
      this.currIndex = this.swipeService.getMouseSwipe(when, drag,this.currIndex,this.maxIndex);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
}

}
