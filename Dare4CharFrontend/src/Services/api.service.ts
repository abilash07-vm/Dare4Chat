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
    headers!: HttpHeaders;

    constructor(private http: HttpClient,private auth:AuthService) {
        this.setTokenkey();
    }

    setTokenkey() {
        this.headers = new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${this.auth.getToken()}`);
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

    // User 
    addUser(user:User){
        return this.http.post(baseurl+'user',user,{ headers: this.headers });
    }
    addAllUsers(){
        return this.http.get(baseurl+'user',{ headers: this.headers });
    }
    updateUser(user:User){
        return this.http.put(baseurl+'user',user,{ headers: this.headers });
    }
    getUserByid(id:string){
        return this.http.get(baseurl+'user/'+id,{ headers: this.headers });
    }
    getUserByEmailid(emailid:string){
        return this.http.get(baseurl+'user/user/'+emailid,{headers:this.headers})
    }

    
}
