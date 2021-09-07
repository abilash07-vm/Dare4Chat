import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserCredientials } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { PopupsService } from 'src/Services/popups.service';

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {
  // Login
  email:string=""
  loginPassword:string=""
  loginErrors:string=""
  loginhide:boolean=true

  // Signup 
  otp:string=""
  username:string=""
  signupPassword:string=""
  signupErrors:string=""
  openOtp:boolean=false
  signuphide:boolean=true
  isVerified: boolean=false;

  // Forgot Password
  isForget=false

  constructor(private auth:AuthService,
    private popup:PopupsService,
    private api:ApiService,
    private router:Router,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    document.getElementById('foc')?.focus();
  }

  onLogin(){
    this.spinner.show()
    if(this.email.length==0){
      this.spinner.hide()
      this.loginErrors="Email is required";
    }else if(!emailRegexp.test(this.email)){
      this.spinner.hide()
      this.loginErrors="Invaid Email id";
    } else if(this.loginPassword.length==0){
      this.spinner.hide()
      this.loginErrors="Password is required"
    }else{
      this.auth.login({"admin":false,"emailid":this.email,"password":this.loginPassword}).subscribe((data:any)=>{
        let token=data.token;
        
        if(token){
          this.auth.setToken(token);
          this.api.setTokenkey();
          this.api.getUserByEmailid(this.email).subscribe((data2:any)=>{
            if(data2){
              let user:User=data2;
              this.auth.setUserId(user.userid);
              this.auth.setUser(JSON.stringify(user))
              this.spinner.hide();
              this.router.navigate(['/','home']);
            }else{
              this.loginErrors=data2.message
              this.spinner.hide();
            }
          }) 
        }else{
          this.loginErrors=data.message
          this.spinner.hide();
        }
        
      });
    }
    
  }
  onSendOTP(isForgotPass?:boolean){
    this.spinner.show()
    if(this.email.length==0){
      this.signupErrors="Email is required";
      this.spinner.hide()
    }else if(!emailRegexp.test(this.email)){
      this.spinner.hide()
      this.signupErrors="Invalid Email id";
    } else if(this.username.length==0 && !isForgotPass){
      this.signupErrors="username is required"
      this.spinner.hide()
    }else if(this.username.length>20 && !isForgotPass){
      this.signupErrors="username is too long"
      this.spinner.hide()
    }else{
      this.auth.sendOTP(this.email,isForgotPass || false).subscribe((data:any)=>{
        let message=data.message;
        if(message==='OTP sent'){
          this.openOtp=true;
          this.signupErrors=""
        }
        this.popup.openSnackbar(message);
        this.spinner.hide()
      })
    }
    if(isForgotPass){
      this.loginErrors=this.signupErrors;
    }
  }
  onVerify(){
    if(this.otp.length<4){
      this.popup.openSnackbar('otp is required!!');
      return;
    }
    this.spinner.show()
    this.auth.verifyOTP(this.email,this.otp).subscribe((data:any)=>{
      
      
      if(data["message"]==="verified"){
        this.popup.openSnackbar('OTP verified!!!')
        this.isVerified=true
        this.signupErrors=""
        this.spinner.hide()
      }else{
        this.signupErrors="Wrong OTP"
        this.spinner.hide()
      }
    })
  }

  onSignup(){
    this.spinner.show()
    if(!this.isVerified){
      this.signupErrors="Please verify OTP"
      this.spinner.hide()
    }else if(this.signupPassword.length<5){
      this.signupErrors="Password length should be minimum 5 characters"
      this.spinner.hide()
    }else{
      let userCrediential:UserCredientials={
        emailid:this.email,
        admin:false,
        password:this.signupPassword
      }
      this.auth.createUser(userCrediential).subscribe((data:any)=>{
        let token=data.token;
        let userid=data.userid
                
        if(token){
          this.auth.setToken(token);
          this.api.setTokenkey();
          if(this.isForget){
           this.onResetPassword();
          }else{
            this.onCreateAccount(userid);
          }
          
        }else{
          this.signupErrors="token not found"
          this.spinner.hide()
        }
        
      })
    }
    
  }

  onResetPassword(){
    if(this.signupPassword.length<5){
      this.signupErrors="Password length should be minimum 5 characters"
      this.spinner.hide()
      return;
    }
    this.auth.updatePassword({"admin":false,"emailid":this.email,"password":this.signupPassword}).subscribe((data)=>{
      
      this.api.getUserByEmailid(this.email).subscribe((data:any)=>{
        let user:User=data
        this.auth.setUser(JSON.stringify(user));
        this.auth.setUserId(user.userid);
        this.router.navigate(['/','home'])
      })
    })
  
  }

  onCreateAccount(userid:string){
    let user:User={
      "emailid":this.email,
      "userid":userid,
      "username":this.username,
      "friendsids":[],
      "postids":[],
      "isPro":false,
      "isOnline":true,
      "lastseen":new Date(),
      "bio":'',
      "category":"Public",
      "messageids":[],
      "lastMessageTime": new Date()
    }
    this.auth.setUser(JSON.stringify(user));
    this.api.addUser(user).subscribe((data:any)=>{
      
      this.auth.setUserId(user.userid);
      this.spinner.hide()
      this.router.navigate(['/','profile']);
    }) 
  }

  onClickForgotPassword(){
    this.isForget=true
    this.onSendOTP(true);
  }

}
