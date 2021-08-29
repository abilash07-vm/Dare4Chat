import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PullToRefreshService } from '@piumaz/pull-to-refresh';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Dare4CharFrontend';
    userid!:string
    notificationCount:number=0
    currentTab:string='home'
    constructor(private auth: AuthService,
        private router:Router,
        private api:ApiService,
        private refresh:PullToRefreshService) {
        let id= this.auth.getUserId();
        if(id){
            this.userid=id;
            refresh.refresh$().subscribe(()=>{
                console.log('refresh by observable');
                window.location.reload()
            })
            this.observeBadges()
            this.updateTabName('home')
        }
    }

    observeBadges(){
        this.api.notificationCountObs.subscribe((count:any)=>{
            this.notificationCount=count;
        })
    }
    updateTabName(path:string){
        this.currentTab=path
        this.router.navigate(['/',path]);
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
