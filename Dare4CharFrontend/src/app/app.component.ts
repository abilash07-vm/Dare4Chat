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
    title = 'Dare4Chat';
    currUserid!:string
    notificationCount:number=0
    currentTab!:string

    constructor(private auth: AuthService,
        private router:Router,
        private api:ApiService,
        private refresh:PullToRefreshService) {
        let id= this.auth.getUserId();
        this.updateTabName(this.currentTabName())
        if(id){
            this.currUserid=id;
            refresh.refresh$().subscribe(()=>{
                console.log('refresh by observable');
                window.location.reload();
                this.updateTabName(window.location.pathname.split('/')[1])
                console.log(window.location.pathname.split('/'));
                
            })
            this.observeBadges()
        }
    }

    observeBadges(){
        this.api.getUnreadNotificationCount(this.currUserid).subscribe((data:any)=>{
            let curr:{count:number}=data;
            console.log(curr);
            this.notificationCount=curr.count
        });
        this.api.notificationCountObs.subscribe((isReset)=>{
            if(isReset){
                this.resetNotificationCount()
            }else{
                this.increaseNotificationCount();
            }
        })
    }
    increaseNotificationCount(){
        this.notificationCount+=1;
    }
    resetNotificationCount(){
        this.notificationCount=0
    }
    currentTabName(){
        let l=window.location.pathname.split('/');
        console.log(l);
        return l[1]
    }
    updateTabName(path:string){
        console.log(path);
        this.currentTab=path
        if(['home','search','add','notifications','profile'].indexOf(path)>=0){
            this.router.navigate(['/',path]);
        }
    }

    isLogin(){
        return this.auth.isLogin()
    }

    onLogout(){
        this.currUserid=''
        this.auth.onLogout()
        this.router.navigate(['/','auth'])
    }
}
