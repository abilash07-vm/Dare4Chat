import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/Interfaces/post';
import { Status } from 'src/Interfaces/status';

const baseurl = environment.baseurl;

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    //post
    addPost(post: Post) {
        return this.http.post(baseurl + 'post', post);
    }
    getAllpost(){
        return this.http.get(baseurl+'post');
    }

    //Status
    addStatus(status: Status[]) {
        return this.http.post(baseurl + 'status', status);
    }
}
