import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/Interfaces/post';
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
        
      })
    }
  }

  onComment(){
    this.api.sendNotificationToUser(this.post.userid,
      {
        "userid":this.currUserid,
        "date": new Date(),
        "type":"comment"
      }).subscribe((data)=>{
        console.log(data);              
      })
  }

}
