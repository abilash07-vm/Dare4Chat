import { Component, Input, OnInit } from '@angular/core';
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
  @Input() type:string='other'
  @Input() user!:User
  currUserid!:string

  posts:Post[]=[]

  constructor(private api:ApiService,private auth:AuthService) {}

  ngOnInit(): void {
    let user=this.auth.getUser()
    if(user){
      let id=this.auth.getUserId()
      if(id){
        this.currUserid=id
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
    return this.user.profileurl ? this.user.profileurl:this.api.profileurl;
  }


  onEditButtonClick(){

  }
  onRequest(){
    this.api.sendFriendRequest(this.currUserid,this.user.userid).subscribe((data)=>{
      console.log('request sent',data);
    })
  }
  onUnfriend(){
    
  }
  onCancel(){
    this.api.cancelFriendRequest(this.currUserid,this.user.userid).subscribe((data)=>{
      console.log('request cancel',data);
    })
  }
  onAccept(){
    
  }

}
