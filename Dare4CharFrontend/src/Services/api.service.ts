import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Message } from 'src/Interfaces/chat';
import { Post,Comment } from 'src/Interfaces/post';
import { Status } from 'src/Interfaces/status';
import { Pro, User } from 'src/Interfaces/user';
import { Notification } from 'src/Interfaces/notification';

import { AuthService } from './auth.service';

//socket
import { io } from 'socket.io-client'
import { Subject } from 'rxjs';


const BASEURL = environment.BASEURL;
const socket=io("http://localhost:3000/",{
  transports: ["websocket", "polling"] 
});

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    token!:string
    userid!:string
    headers!: HttpHeaders;
    profileurl:string="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F252-2524695_dummy-profile-image-jpg-hd-png-download.png&f=1&nofb=1"

    // socket observable
    private newMessage:Subject<any>=new Subject<any>();
    messageObs=this.newMessage.asObservable();

    private newNotification:Subject<any>=new Subject<any>();
    notificationObs=this.newNotification.asObservable();

    private notificationCount:Subject<any>=new Subject<any>();
    notificationCountObs=this.notificationCount.asObservable();


    constructor(private http: HttpClient,
        private auth:AuthService) {
        this.setTokenkey();
        this.updateUserForLocalStorage()
        this.socketTasks()

    }

    socketTasks(){
        // Sockets
        console.log(this.userid+'message');
        
        socket.on(this.userid+'message',(data:Message)=>{
            console.log('socket.io',data);
            this.newMessage.next(data);
        })

        socket.on(this.userid+'notification',(data:Notification)=>{
            this.newNotification.next(data);
            console.log(data);
        })
    }

    setNotificationCount(count:number){
        this.notificationCount.next(count);
    }

    setTokenkey() {
        this.headers = new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${this.auth.getToken()}`);
    }
    
    updateUserForLocalStorage(){
        let userid=this.auth.getUserId()
        if(userid){
            this.userid=userid
            this.getUserByid(userid).subscribe((data:any)=>{
                this.auth.setUser(JSON.stringify(data));
            })
        }
    }

    //post
    addPost(post: Post) {
        return this.http.post(BASEURL + 'post', post,{ headers: this.headers });
    }
    getAllpost(){
        return this.http.get(BASEURL+'post',{ headers: this.headers });
    }
    getPostById(postid:string){
        return this.http.get(`${BASEURL}post/${postid}`,{ headers: this.headers })
    }
    getPostByUserId(userid:string){
        return this.http.get(`${BASEURL}post/user/${userid}`,{ headers: this.headers })
    }
    updatePost(post:Post){
        return this.http.put(BASEURL + 'post' , post,{ headers: this.headers })
    }
    deletePostById(postid:string,postUserid:string){
        return this.http.delete(`${BASEURL}post/delete/${postUserid}/${postid}`,{ headers: this.headers })
    }

    //Status
    addStatus(status: Status) {
        return this.http.post(BASEURL + 'status', status,{ headers: this.headers });
    }
    getAllStatus(){
        return this.http.get(BASEURL + 'status',{ headers: this.headers });
    }
    getStatusByUserId(userid:string){
        return this.http.get(`${BASEURL}status/${userid}`,{headers:this.headers});
    }
    updateStatus(status:Status){
        return this.http.put(BASEURL + 'status' , status,{ headers: this.headers })
    }
    deleteStatusById(statusid:string){
        return this.http.get(`${BASEURL}status/${statusid}`,{ headers: this.headers })
    }

    // User 
    addUser(user:User){
        return this.http.post(BASEURL+'user',user,{ headers: this.headers });
    }
    getAllUsers(){
        return this.http.get(BASEURL+'user',{ headers: this.headers });
    }
    updateUser(user:User){
        return this.http.put(BASEURL+'user',user,{ headers: this.headers });
    }
    updateUserProfile(user:User){
        return this.http.put(BASEURL+'user/update',user,{ headers: this.headers });
    }
    updateUserProDetail(user:Pro){
        return this.http.put(BASEURL+'user/updatePro',user,{ headers: this.headers });
    }
    getUserByid(id:string){
        return this.http.get(BASEURL+'user/'+id,{ headers: this.headers });
    }
    getUserByEmailid(emailid:string){
        return this.http.get(BASEURL+'user/user/'+emailid,{headers:this.headers})
    }
    addFriendid(friendid:string,userid:string){
        return this.http.put(`${BASEURL}user/addfriend/${friendid}/${userid}`,{},{headers:this.headers})
    }
    removeFriendid(friendid:string,userid:string){
        return this.http.put(`${BASEURL}user/removefriend/${friendid}/${userid}`,{},{headers:this.headers})
    }
    // verifyAccount(user:User,detail:any){
    //     let payload=Object.assign({},user,detail);
    //     return this.http.post(`${BASEURL}proVerify`,payload,{headers:this.headers})
    // }

    // likes
    addLike(userid:string,postid:string){
        return this.http.put(`${BASEURL}post/addlike/${userid}/${postid}`,{},{headers:this.headers})
    }
    removeLike(userid:string,postid:string){
        return this.http.put(`${BASEURL}post/removelike/${userid}/${postid}`,{},{headers:this.headers})
    }

    //Comment
    addCommentToAPost(postid:string,comment:Comment){
        return this.http.put(`${BASEURL}post/addcomment/${postid}`,comment,{headers:this.headers})
    }
    removeCommentFromPost(postid:string,comment:Comment){
        return this.http.put(`${BASEURL}post/removecomment/${postid}`,comment,{headers:this.headers})
    }

    // Message
    addMessage(message: Message) {
        return this.http.post(BASEURL + 'message', message,{ headers: this.headers });
    }
    getMessageById(messageid:string){
        return this.http.get(`${BASEURL}message/${messageid}`,{ headers: this.headers })
    }
    getMessageByUserId(userid:string){
        return this.http.get(`${BASEURL}message/user/${userid}`,{ headers: this.headers })
    }

    // Friend Request
    sendFriendRequest(userid:string,friendid:string){
        return this.http.put(`${BASEURL}friendrequest/sent/${userid}/${friendid}`,{},{headers:this.headers})
    }
    cancelFriendRequest(userid:string,friendid:string){
        return this.http.put(`${BASEURL}friendrequest/cancel/${userid}/${friendid}`,{},{headers:this.headers})
    }
    getUserSentFriendRequest(userid:string){
        return this.http.get(`${BASEURL}friendrequest/sent/${userid}`,{headers:this.headers})
    }
    getUserReceivedFriendRequest(userid:string){
        return this.http.get(`${BASEURL}friendrequest/recieved/${userid}`,{headers:this.headers})
    }


    // date difference
    getDateDiffFromNowInMS(date:Date){
        return new Date().getTime()-new Date(date).getTime()
    }
    getDateDiffInWord(diffInMS:number){
        let aSec=1000;
        let aMin=60*aSec
        let aHour=60*aMin
        let aDay=24*aHour
        let res=""
        if(diffInMS>=aDay){
            let days=Math.floor(diffInMS/aDay)
            res=`${days} day${this.getSuffixS(days)}`
        }else{
            if(diffInMS>aHour){
                let hours=Math.floor(diffInMS/aHour)
                res=`${hours} hour${this.getSuffixS(hours)}`
            }else{
                if(diffInMS>aMin){
                    let mins=Math.floor(diffInMS/aMin)
                    res=`${mins} minute${this.getSuffixS(mins)}`
                }else{
                    let seconds=Math.floor(diffInMS/1000)
                    res=`${seconds} second${this.getSuffixS(seconds)}`
                }
            }

        }
        return res;

    }
    isDifferentDay(date1: Date, date2: Date): boolean {
        let d1=`${date1.getDate()}/${date1.getMonth()}/${date1.getFullYear()}`
        let d2=`${date2.getDate()}/${date2.getMonth()}/${date2.getFullYear()}`
        
        if(d1===d2){
    
          return false
        }
        return true
    }
    
    getSuffixS(val:number){
        if(val==1){
            return ' ago'
        }
        return 's ago'
    }

    // online and offline
    onOffline(){
        this.http.put(BASEURL+'user/updateLastseen',{userid:this.userid,isOnline:false,lastseen:new Date()},{ headers: this.headers }).subscribe((data)=>{
            this.getUserByid(this.userid).subscribe((data)=>{
            })
        });
    }
    onOnline(){
        this.http.put(BASEURL+'user/updateLastseen',{userid:this.userid,isOnline:true,lastseen:new Date()},{ headers: this.headers }).subscribe((data)=>{
            this.getUserByid(this.userid).subscribe((data)=>{
            })
        });

    }

    // Notifications
    getNotificationByuserid(userid:string){
        return this.http.get(`${BASEURL}notification/${userid}`,{headers:this.headers});
    }

    sendNotificationToUser(userid:string,notification:Notification){
        return this.http.post(`${BASEURL}notification/${userid}`,notification,{headers:this.headers});
    }
    updateReadNotification(notification:Notification){
        return this.http.put(`${BASEURL}notification`,notification,{headers:this.headers});
    }

    //Pro request
    addProRequest(proRequest:Pro){
        return this.http.post(`${BASEURL}pro/`,proRequest,{headers:this.headers});
    }
    getAllProRequest(){
        return this.http.get(`${BASEURL}pro/`,{headers:this.headers});
    }
    deleteProRequest(userid:string){
        console.log(userid);
        return this.http.delete(`${BASEURL}pro/${userid}`,{headers:this.headers});
    }
   
    
}
