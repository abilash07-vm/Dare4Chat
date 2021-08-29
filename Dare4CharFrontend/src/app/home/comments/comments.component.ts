import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Post,Comment } from 'src/Interfaces/post';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  post!:Post
  currUserid!: string;
  comments:Comment[]=[]
  usercomment:string=''
  users: {[userid:string]:User}={}

  constructor(private activatedRoute:ActivatedRoute,
    private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    let userid=this.auth.getUserId();
    if(userid){
      this.currUserid=userid
    }
    let postid=this.activatedRoute.snapshot.paramMap.get('postid');
    if(postid){
      this.api.getPostById(postid).subscribe((post:any)=>{
        this.post=post;  
        this.getAllComments()
      })
    }
  }
  getAllComments(){
    console.log(this.post.comments);
    this.post.comments.forEach((comment)=>{
      this.comments.push(comment);
      if(!this.users[comment.userid]){
        this.api.getUserByid(comment.userid).subscribe((user:any)=>{
          this.users[comment.userid]=user;
        });
      }
    })
  }

  getProfile(ind:number){
    return this.users[ind]?.profileurl ? this.users[ind].profileurl : this.api.profileurl;
  }

  getDate(date:Date){
    return this.api.getDateDiffInWord(this.api.getDateDiffFromNowInMS(date));
  }

  onComment(){
    if(this.post?.postid){
      let comment:Comment={"date":new Date(),"message":this.usercomment,"userid":this.currUserid}
      this.api.addCommentToAPost(this.post.postid,comment).subscribe((data:any)=>{
        console.log(data);
        this.api.sendNotificationToUser(this.post.userid,
          {
            "userid":this.currUserid,
            "date": new Date(),
            "type":"comment",
            "read": false
          }).subscribe((data)=>{
            console.log(data);  
            window.location.reload();            
          })
        
      })
      
    }
  }

}
