import { Component, OnInit } from '@angular/core';
import { Pro, User} from 'src/Interfaces/user';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css']
})
export class ProListComponent implements OnInit {
  pro_users:Pro[]=[]
  constructor() { }

  ngOnInit(): void {
  }

  onClickUser(user:User){

  }

  getProfile(i:number){

  }

}
