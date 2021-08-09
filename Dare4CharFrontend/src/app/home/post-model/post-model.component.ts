import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/Interfaces/post';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { TouchSwipeService } from 'src/Services/touch-swipe.service';

@Component({
  selector: 'app-post-model',
  templateUrl: './post-model.component.html',
  styleUrls: ['./post-model.component.css']
})
export class PostModelComponent implements OnInit {
  currIndex = 0;
  maxIndex = 0;
  currUserid!:string

  constructor(private swipeService: TouchSwipeService,
    private auth:AuthService,
    private api:ApiService,
    private router:Router) {
      let id=auth.getUserId();
      if(id){
        this.currUserid=id;
      }
    }

  @Input('post') post!:Post
  postOwner!:User
  
  ngOnInit(): void {
    if(this.post.items){
    
      this.maxIndex=this.post.items.length
      this.api.getUserByid(this.post.userid).subscribe((data:any)=>{
        this.postOwner=data;
      })
    }
  }

  getDateInString(){
    let postDate:Date=new Date(this.post.date);
    return this.api.getDateDiffInWord(new Date().getTime()-postDate.getTime())
  }
  getProfileUrl(){
    return this.postOwner.profileurl ? this.postOwner.profileurl : this.api.profileurl;
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

  onDelete(){
    if(this.post.postid){
      this.api.deletePostById(this.post.postid,this.post.userid).subscribe((data)=>{
        console.log('deleted post: ',data);
        window.location.reload();
      })
    }
  }

  // Likes

  isLike(){
    if(this.currUserid){
      let ind=this.post.likeids.indexOf(this.currUserid);
      if(ind>=0){
        return true
      }
    }
    return false
  }

  onLike(){
    if(this.currUserid && this.post.postid){
      let ind=this.post.likeids.indexOf(this.currUserid);
      if(ind<0){
        this.post.likeids.push(this.currUserid);
        this.api.addLike(this.currUserid,this.post.postid).subscribe((data)=>{
          console.log(data);
        })
      }else{
        this.post.likeids.splice(ind,1);
        this.api.removeLike(this.currUserid,this.post.postid).subscribe((data)=>{
          console.log(data);
        })
      }
    }
  }

  // Comments
  onComment(){
    this.router.navigate(['/','home','comments',this.post.postid]);
  }

}
