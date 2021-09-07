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
    chatCount:number=0
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
                
                window.location.reload();
                this.updateTabName(window.location.pathname.split('/')[1])
                
                
            })
            this.observeBadges()
        }
    }

    observeBadges(){
        this.api.getUnreadNotificationCount(this.currUserid).subscribe((data:any)=>{
            let curr:{count:number}=data;
            
            this.notificationCount=curr.count
        });
        this.api.notificationCountObs.subscribe((isReset)=>{
            if(isReset){
                this.resetNotificationCount()
            }else{
                this.increaseNotificationCount();
            }
        })
        this.api.updateChatCountNavbarObs.subscribe((val:any)=>{
            this.chatCount=val;
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
        
        return l[1]
    }
    updateTabName(path:string){
        
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
