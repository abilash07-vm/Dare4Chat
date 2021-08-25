import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserCredientials } from 'src/Interfaces/user';

const baseurl = environment.baseurl;
const ADD_KEY = 'dare4chat-add-key';
const JWT_TOKEN='dare4chat-jwt-key';
const USER_KEY='dare4chat-user-key';
const USERID_KEY='dare4chat-userid-key'
const LAST_TAB='dare4chat-last-tab-key'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http:HttpClient) {}
    // Common Local storage methods
    private setToStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    private getFromStorage(key: string) {
        return localStorage.getItem(key);
    }
    private delItemFromStrong(key: string) {
        localStorage.removeItem(key);
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
    sendOTP(mailid:string,isForgotPass:boolean){
        return this.http.get(`${baseurl}sendotp/${mailid}/${isForgotPass}`);
    }
    verifyOTP(mailid:string,otp:string){
        return this.http.get(`${baseurl}verify/${mailid}/${otp}`)
    }

    //auth
    createUser(userCrediential:UserCredientials){
        return this.http.post(`${baseurl}auth/new`,userCrediential);
    }
    updatePassword(userCred:UserCredientials){
        return this.http.post(baseurl + 'auth/resetpass', userCred);
    }
    login(payload: UserCredientials) {
        return this.http.post(baseurl + 'auth', payload);
    }
    isLogin(){
        return this.getToken() && this.getUser() && this.getUserId();
    }

    //token
    setToken(token:string){
        this.setToStorage(JWT_TOKEN,token);
    }
    getToken(){
        return this.getFromStorage(JWT_TOKEN);
    }
    delToken(){
        this.delItemFromStrong(JWT_TOKEN);
    }
    onLogout(){
        this.delAddData();
        this.delToken();
        this.delUser();
        this.delUserId();
    }


    //User
    setUser(user:string){
        this.setToStorage(USER_KEY,user);
    }
    getUser(){
        return this.getFromStorage(USER_KEY);
    }
    delUser(){
        return this.delItemFromStrong(USER_KEY);
    }

    //User Id
    setUserId(user:string){
        this.setToStorage(USERID_KEY,user);
    }
    getUserId(){
        return this.getFromStorage(USERID_KEY);
    }
    delUserId(){
        return this.delItemFromStrong(USERID_KEY);
    }

    // last Tab  in home 
    getLatTab(){
        return this.getFromStorage(LAST_TAB);
    }
    setLastTab(tab:string){
        this.setToStorage(LAST_TAB,tab)
    }

}
