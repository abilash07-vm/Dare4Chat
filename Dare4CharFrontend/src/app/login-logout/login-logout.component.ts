import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { PopupsService } from 'src/Services/popups.service';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  email:string=""
  loginPassword:string=""
  signupPassword:string=""
  username:string=""
  otp:string=""
  loginErrors:string=""
  signupErrors:string=""
  openOtp:boolean=false

  constructor(private auth:AuthService,private popup:PopupsService) { }

  ngOnInit(): void {
  }

  onLogin(){
    if(this.email.length==0){
      this.loginErrors="Email is required";
    }else if(this.loginPassword.length==0){
      this.loginErrors="Password is required"
    }else{
      console.log(`email=${this.email}, password=${this.loginPassword}`);
    }
    
  }
  onVerify(){
    if(this.email.length==0){
      this.signupErrors="Email is required";
    }else if(this.signupPassword.length==0){
      this.signupErrors="Password is required"
    }else{
      this.auth.sendOTP(this.email).subscribe((data)=>{
        this.openOtp=true;
        this.popup.openSnackbar('OTP Sent to mail!!!')
      })
    }
  }
  onSignup(){
    this.auth.verifyOTP(this.email,this.otp).subscribe((data:any)=>{
      if(data["message"]==="verified"){
        console.log('verified!!!!');
      }
    })
  }

}
