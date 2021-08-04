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
  profileurl:string="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F252-2524695_dummy-profile-image-jpg-hd-png-download.png&f=1&nofb=1"

  constructor(private swipeService: TouchSwipeService,
    private auth:AuthService,
    private api:ApiService,
    private router:Router) { }

  @Input('post') post!:Post
  postOwner!:User
  
  ngOnInit(): void {
    console.log('post is ',this.post);
    this.maxIndex=this.post.items.length
    this.api.getUserByid(this.post.userid).subscribe((data:any)=>{
      this.postOwner=data;
      this.postOwner.username;
    })
  }
  getProfileUrl(){
    return this.postOwner.profileurl ? this.postOwner.profileurl : this.profileurl;
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

  // Likes

  isLike(){
    let id=this.auth.getUserId();
    if(id){
      let ind=this.post.likeids.indexOf(id);
      if(ind>=0){
        return true
      }
    }
    return false
  }

  onLike(){
    let id=this.auth.getUserId();
    if(id){
      let ind=this.post.likeids.indexOf(id);
      console.log(`index: ${ind}`);
      
      if(ind<0){
        this.post.likeids.push(id);
      }else{
        this.post.likeids.splice(ind,1);
      }
      this.api.updatePost(this.post).subscribe((date)=>{
        console.log('updated post');
      })
    }
  }

  // Comments
  onComment(){
    this.router.navigate(['/','home','comments',this.post.postid]);
  }

}
