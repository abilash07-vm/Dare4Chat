import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { ComponentCanDeactivate } from 'src/Services/pending-changes-guard.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,ComponentCanDeactivate {
  
  constructor(private auth:AuthService,private api:ApiService) { }
  @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
      // insert logic to check if there are pending changes here;
      // returning true will navigate without confirmation
      // returning false will show a confirm dialog before navigating away
      this.api.onOffline()
      return true;
    }

  user!:User

  ngOnInit(): void {
    let user=this.auth.getUser()
    if(user){
      this.user=JSON.parse(user)
    }
  }

}
