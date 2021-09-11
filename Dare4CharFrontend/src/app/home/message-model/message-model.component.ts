import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/Interfaces/chat';
import { Post } from 'src/Interfaces/post';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-message-model',
  templateUrl: './message-model.component.html',
  styleUrls: ['./message-model.component.css']
})
export class MessageModelComponent implements OnInit {
  @Input() user!:User
  @Input() message!:Message
  @Input() curr_userid!:string
  @Input() isNew:boolean=false
  post!:Post

  constructor(private api:ApiService) {}

  ngOnInit(): void {    
    if(this.message.type === 'post'){
      this.api.getPostById(this.message.message).subscribe((data:any)=>{
        this.post=data;
        console.log('post',data);
        
      })
    }
    
  }

}
