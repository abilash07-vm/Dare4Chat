import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users:User[]=[]
  @Output() userclick=new EventEmitter();

  query:string=''

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  onClickUser(user:User){
    this.userclick.emit(user);
  }
  getProfile(i:number){
    return this.users[i].profileurl ? this.users[i].profileurl : this.api.profileurl;
  }

}
