import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/Interfaces/post';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  post!:Post
  constructor(private activatedRoute:ActivatedRoute,
    private api:ApiService) { }

  ngOnInit(): void {
    let postid=this.activatedRoute.snapshot.paramMap.get('postid');
    if(postid){
      this.api.getPostById(postid).subscribe((post:any)=>{
        this.post=post;
        
      })
    }
  }



}
