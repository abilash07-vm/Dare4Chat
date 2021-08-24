import { Component, Input, NgZone, OnInit } from '@angular/core';
import { DateMessage } from 'src/Interfaces/chat';
import { User } from 'src/Interfaces/user';

@Component({
  selector: 'app-date-chat-model',
  templateUrl: './date-chat-model.component.html',
  styleUrls: ['./date-chat-model.component.css']
})
export class DateChatModelComponent implements OnInit {
  @Input() date_message!:DateMessage
  @Input() user!:User
  @Input() curr_userid!:string
  @Input() isnew:boolean=false

  today=new Date()

  constructor(private zone:NgZone) { }

  ngOnInit(): void {
  }

}
