import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {
  @Input() user!:User

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  getProfile(){
    return this.user.profileurl ? this.user.profileurl: this.api.profileurl;
  }

  onProfileClick(){
    
  }

}
