import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Dare4CharFrontend';
    userid!:string
    constructor(private auth: AuthService,private router:Router) {
        let id= this.auth.getUserId();
        if(id){
            this.userid=id;
        }
    }

    isLogin(){
        return this.auth.isLogin()
    }

    onLogout(){
        this.userid=''
        this.auth.onLogout()
        this.router.navigate(['/','auth'])
    }
}
