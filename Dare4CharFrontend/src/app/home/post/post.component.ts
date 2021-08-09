import { Component, OnInit } from '@angular/core';
import { Post } from 'src/Interfaces/post';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts:Post[]=[]
  constructor(private api:ApiService,private auth:AuthService) { 
    
  }

  ngOnInit(): void {
    let ids=[]
    let user=this.auth.getUser()
    if(user){
      let curruser:User=JSON.parse(user);
      ids=curruser.friendsids
      ids.push(curruser.userid)
      ids.forEach((friendid)=>{
        this.api.getPostByUserId(friendid).subscribe((data:any)=>{
          let postArr:Post[]=data;
          postArr.forEach((post)=>{
            this.posts.push(post)
          })
          
        })
      })
    }
   
  }

}
