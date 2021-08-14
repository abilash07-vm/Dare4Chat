import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/Interfaces/post';
import { Status } from 'src/Interfaces/status';
import { User } from 'src/Interfaces/user';
import { AuthService } from './auth.service';

const baseurl = environment.baseurl;


@Injectable({
    providedIn: 'root',
})
export class ApiService {
    token!:string
    userid!:string
    headers!: HttpHeaders;
    profileurl:string="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F252-2524695_dummy-profile-image-jpg-hd-png-download.png&f=1&nofb=1"


    constructor(private http: HttpClient,private auth:AuthService) {
        this.setTokenkey();
        this.updateUserForLocalStorage()
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
    verifyAccount(user:User,detail:any){
        let payload=Object.assign({},user,detail);
        return this.http.post(`${baseurl}proVerify`,payload,{headers:this.headers})
    }

    // likes
    addLike(userid:string,postid:string){
        return this.http.put(`${baseurl}post/addlike/${userid}/${postid}`,{},{headers:this.headers})
    }
    removeLike(userid:string,postid:string){
        return this.http.put(`${baseurl}post/removelike/${userid}/${postid}`,{},{headers:this.headers})
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
        return new Date().getTime()-date.getTime()
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
                console.log('onOffline',data);
            })
        });
    }
    onOnline(){
        this.http.put(baseurl+'user/updateLastseen',{userid:this.userid,isOnline:true,lastseen:new Date()},{ headers: this.headers }).subscribe((data)=>{
            this.getUserByid(this.userid).subscribe((data)=>{
                console.log('onOnline',data);
            })
        });

    }
    
    
}
