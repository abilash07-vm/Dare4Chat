import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/user';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private auth:AuthService) { }

  user!:User

  ngOnInit(): void {
    let user=this.auth.getUser()
    if(user){
      this.user=JSON.parse(user)
    }
  }

}
