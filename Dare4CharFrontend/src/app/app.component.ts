import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PullToRefreshService } from '@piumaz/pull-to-refresh';
import { AuthService } from 'src/Services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Dare4CharFrontend';
    userid!:string
    constructor(private auth: AuthService,
        private router:Router,
        private refresh:PullToRefreshService) {
        let id= this.auth.getUserId();
        if(id){
            this.userid=id;
            refresh.refresh$().subscribe(()=>{
                console.log('refresh by observable');
                window.location.reload()
            })
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
