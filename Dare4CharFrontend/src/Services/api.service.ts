import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/Interfaces/post';

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
}
