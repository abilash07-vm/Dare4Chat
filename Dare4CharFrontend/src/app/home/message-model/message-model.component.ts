import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/Interfaces/chat';
import { User } from 'src/Interfaces/user';

@Component({
  selector: 'app-message-model',
  templateUrl: './message-model.component.html',
  styleUrls: ['./message-model.component.css']
})
export class MessageModelComponent implements OnInit {
  @Input() user!:User
  @Input() message!:Message
  @Input() curr_userid!:string

  constructor() { 
    
  }

  ngOnInit(): void {    
    
  }

}
