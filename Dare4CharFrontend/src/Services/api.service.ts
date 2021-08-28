import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from 'src/Interfaces/chat';
import { Post,Comment } from 'src/Interfaces/post';
import { Status } from 'src/Interfaces/status';
import { Pro, User } from 'src/Interfaces/user';
import { AuthService } from './auth.service';

//socket
import { io } from 'socket.io-client'

import { Subject } from 'rxjs';
import { Notification } from 'src/Interfaces/notification';

const baseurl = environment.baseurl;
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

    private newMessage:Subject<any>=new Subject<any>();
    messageObs=this.newMessage.asObservable();


    constructor(private http: HttpClient,
        private auth:AuthService) {
        this.setTokenkey();
        this.updateUserForLocalStorage()

        this.socketTasks()

    }

    socketTasks(){
        // Sockets
        console.log(this.userid+'message');
        
        socket.on(this.userid+'message',(data:any)=>{
            console.log('socket.io',data);
            this.newMessage.next(data);
        })

        socket.on(this.userid+'notification',(data:any)=>{
            console.log('socket.io',data);
            
        })
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
        return this.http.post(baseurl + 'post', post,{ headers: this.headers });
    }
    getAllpost(){
        return this.http.get(baseurl+'post',{ headers: this.headers });
    }
    getPostById(postid:string){
        return this.http.get(`${baseurl}post/${postid}`,{ headers: this.headers })
    }
    getPostByUserId(userid:string){
        return this.http.get(`${baseurl}post/user/${userid}`,{ headers: this.headers })
    }
    updatePost(post:Post){
        return this.http.put(baseurl + 'post' , post,{ headers: this.headers })
    }
    deletePostById(postid:string,postUserid:string){
        return this.http.delete(`${baseurl}post/delete/${postUserid}/${postid}`,{ headers: this.headers })
    }

    //Status
    addStatus(status: Status) {
        return this.http.post(baseurl + 'status', status,{ headers: this.headers });
    }
    getAllStatus(){
        return this.http.get(baseurl + 'status',{ headers: this.headers });
    }
    getStatusByUserId(userid:string){
        return this.http.get(`${baseurl}status/${userid}`,{headers:this.headers});
    }
    updateStatus(status:Status){
        return this.http.put(baseurl + 'status' , status,{ headers: this.headers })
    }
    deleteStatusById(statusid:string){
        return this.http.get(`${baseurl}status/${statusid}`,{ headers: this.headers })
    }

    // User 
    addUser(user:User){
        return this.http.post(baseurl+'user',user,{ headers: this.headers });
    }
    getAllUsers(){
        return this.http.get(baseurl+'user',{ headers: this.headers });
    }
    updateUser(user:User){
        return this.http.put(baseurl+'user',user,{ headers: this.headers });
    }
    updateUserProfile(user:User){
        return this.http.put(baseurl+'user/update',user,{ headers: this.headers });
    }
    updateUserProDetail(user:Pro){
        return this.http.put(baseurl+'user/updatePro',user,{ headers: this.headers });
    }
    getUserByid(id:string){
        return this.http.get(baseurl+'user/'+id,{ headers: this.headers });
    }
    getUserByEmailid(emailid:string){
        return this.http.get(baseurl+'user/user/'+emailid,{headers:this.headers})
    }
    addFriendid(friendid:string,userid:string){
        return this.http.put(`${baseurl}user/addfriend/${friendid}/${userid}`,{},{headers:this.headers})
    }
    removeFriendid(friendid:string,userid:string){
        return this.http.put(`${baseurl}user/removefriend/${friendid}/${userid}`,{},{headers:this.headers})
    }
    // verifyAccount(user:User,detail:any){
    //     let payload=Object.assign({},user,detail);
    //     return this.http.post(`${baseurl}proVerify`,payload,{headers:this.headers})
    // }

    // likes
    addLike(userid:string,postid:string){
        return this.http.put(`${baseurl}post/addlike/${userid}/${postid}`,{},{headers:this.headers})
    }
    removeLike(userid:string,postid:string){
        return this.http.put(`${baseurl}post/removelike/${userid}/${postid}`,{},{headers:this.headers})
    }

    //Comment
    addCommentToAPost(postid:string,comment:Comment){
        return this.http.put(`${baseurl}post/addcomment/${postid}`,comment,{headers:this.headers})
    }
    removeCommentFromPost(postid:string,comment:Comment){
        return this.http.put(`${baseurl}post/removecomment/${postid}`,comment,{headers:this.headers})
    }

    // Message
    addMessage(message: Message) {
        return this.http.post(baseurl + 'message', message,{ headers: this.headers });
    }
    getMessageById(messageid:string){
        return this.http.get(`${baseurl}message/${messageid}`,{ headers: this.headers })
    }
    getMessageByUserId(userid:string){
        return this.http.get(`${baseurl}message/user/${userid}`,{ headers: this.headers })
    }

    // Friend Request
    sendFriendRequest(userid:string,friendid:string){
        return this.http.put(`${baseurl}friendrequest/sent/${userid}/${friendid}`,{},{headers:this.headers})
    }
    cancelFriendRequest(userid:string,friendid:string){
        return this.http.put(`${baseurl}friendrequest/cancel/${userid}/${friendid}`,{},{headers:this.headers})
    }
    getUserSentFriendRequest(userid:string){
        return this.http.get(`${baseurl}friendrequest/sent/${userid}`,{headers:this.headers})
    }
    getUserReceivedFriendRequest(userid:string){
        return this.http.get(`${baseurl}friendrequest/recieved/${userid}`,{headers:this.headers})
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
        this.http.put(baseurl+'user/updateLastseen',{userid:this.userid,isOnline:false,lastseen:new Date()},{ headers: this.headers }).subscribe((data)=>{
            this.getUserByid(this.userid).subscribe((data)=>{
            })
        });
    }
    onOnline(){
        this.http.put(baseurl+'user/updateLastseen',{userid:this.userid,isOnline:true,lastseen:new Date()},{ headers: this.headers }).subscribe((data)=>{
            this.getUserByid(this.userid).subscribe((data)=>{
            })
        });

    }

    // Notifications
    getNotificationByuserid(userid:string){
        return this.http.get(`${baseurl}notification/${userid}`,{headers:this.headers});
    }

    sendNotificationToUser(userid:string,notification:Notification){
        return this.http.post(`${baseurl}notification/${userid}`,notification,{headers:this.headers});
    }

    //Pro request
    addProRequest(proRequest:Pro){
        return this.http.post(`${baseurl}pro/`,proRequest,{headers:this.headers});
    }
    getAllProRequest(){
        return this.http.get(`${baseurl}pro/`,{headers:this.headers});
    }
    deleteProRequest(userid:string){
        console.log(userid);
        return this.http.delete(`${baseurl}pro/${userid}`,{headers:this.headers});
    }
   
    
}
