import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserCredientials } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
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
  signuphide:boolean=true
  loginhide:boolean=true
  isVerified: boolean=false;

  constructor(private auth:AuthService,
    private popup:PopupsService,
    private api:ApiService,
    private router:Router,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.spinner.show()
    if(this.email.length==0){
      this.spinner.hide()
      this.loginErrors="Email is required";
    }else if(this.loginPassword.length==0){
      this.spinner.hide()
      this.loginErrors="Password is required"
    }else{
      this.auth.login({"admin":false,"emailid":this.email,"password":this.loginPassword}).subscribe((data:any)=>{
        let token=data.token;
        console.log('token',token);
        console.log('data',data);
        
        
        if(token){
          console.log('token stored',token);
          
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
  onVerify(){
    this.spinner.show()
    if(this.email.length==0){
      this.signupErrors="Email is required";
      this.spinner.hide()
    }else if(this.username.length==0){
      this.signupErrors="username is required"
      this.spinner.hide()
    }else{
      this.auth.sendOTP(this.email).subscribe((data:any)=>{
        let message=data.message;
        if(message==='OTP sent'){
          this.openOtp=true;
        }
        this.popup.openSnackbar(message);
        this.spinner.hide()
      })
    }
  }
  onSignup(){
    this.spinner.show()
    if(!this.isVerified){
      this.auth.verifyOTP(this.email,this.otp).subscribe((data:any)=>{
        if(data["message"]==="verified"){
          this.popup.openSnackbar('OTP verified!!!')
          this.isVerified=true
        }else{
          this.signupErrors="Please verify OTP"
          this.spinner.hide()
          return;
        }
      })
    }
    if(this.signupPassword.length<5){
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
        console.log('token',token);
        console.log('data',data);
        
        
        if(token){
          console.log('token stored',token);
          
          this.auth.setToken(token);
          this.api.setTokenkey();
          let user:User={
            "emailid":this.email,
            "userid":userid,
            "username":this.username,
            "friendsids":[],
            "postids":[]
          }
          this.auth.setUser(JSON.stringify(user));
          this.api.addUser(user).subscribe((data:any)=>{
            console.log(data);
            this.auth.setUserId(user.userid);
            this.spinner.hide()
            this.router.navigate(['/','profile']);
          }) 
        }else{
          this.signupErrors="token not found"
          this.spinner.hide()
        }
        
      })
    }
    
  }

}
