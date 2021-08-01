import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseurl = environment.baseurl;
const USER_ID_KEY = 'user-id';
const ADD_KEY = 'add-key';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http:HttpClient) {}
    // Common Local storage methods
    setToStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getFromStorage(key: string) {
        return localStorage.getItem(key);
    }
    delItemFromStrong(key: string) {
        localStorage.removeItem(key);
    }

    // user id
    getUserId() {
        return this.getFromStorage(USER_ID_KEY);
    }
    setUserId(id: string) {
        this.setToStorage(USER_ID_KEY, id);
    }
    delUserId() {
        this.delItemFromStrong(USER_ID_KEY);
    }

    //draft for add tab
    setAddData(data: string) {
        this.setToStorage(ADD_KEY, data);
    }
    getAddData() {
        return this.getFromStorage(ADD_KEY);
    }
    delAddData() {
        this.delItemFromStrong(ADD_KEY);
    }

    // OTP
    sendOTP(mailid:string){
        return this.http.get(`${baseurl}sendotp/${mailid}`);
    }
    verifyOTP(mailid:string,otp:string){
        return this.http.get(`${baseurl}verify/${mailid}/${otp}`)
    }
}
