import { Component, OnInit } from '@angular/core';
import { Post } from 'src/Interfaces/post';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-profile-model',
  templateUrl: './profile-model.component.html',
  styleUrls: ['./profile-model.component.css']
})
export class ProfileModelComponent implements OnInit {
  posts:Post[]=[]
  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
    let user=this.auth.getUser()
    if(user){
      let id=this.auth.getUserId()
      if(id){
        this.api.getPostByUserId(id).subscribe((data:any)=>{
          let postArr:Post[]=data;
          postArr.forEach((post)=>{
            this.posts.push(post)
            console.log(post);
          })
        })  
      }
     
    }
  }

  getProfileUrl(){
    return this.api.profileurl;
  }

}
