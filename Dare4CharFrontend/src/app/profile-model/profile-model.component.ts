import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from 'src/Interfaces/post';
import { User } from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { PopupsService } from 'src/Services/popups.service';
import { UploadFileService } from 'src/Services/upload-file.service';

@Component({
  selector: 'app-profile-model',
  templateUrl: './profile-model.component.html',
  styleUrls: ['./profile-model.component.css']
})
export class ProfileModelComponent implements OnInit {
  @Input() type:string='other'
  @Input() user!:User
  @Output() refresh=new EventEmitter()
  category:string=''
  currUserid!:string
  update_user!:User
  newUrlOfProfile=""

  isEdit=false
  isProRequest=false

  posts:Post[]=[]
  detail_verify: string='';

  constructor(private api:ApiService,
      private auth:AuthService,
      private uploadService: UploadFileService,
      private spinnerService: NgxSpinnerService,
      private popups:PopupsService,
      private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    if(this.user){
      this.update_user=Object.assign({},this.user)
      this.newUrlOfProfile=this.getProfileUrl()
      if(this.user.category!='Public'){
        this.category=this.user.category;
      }
      let user=this.auth.getUser()
      if(user){
        let id=this.auth.getUserId()
        if(id){
          this.currUserid=id
          this.api.getPostByUserId(this.user.userid).subscribe((data:any)=>{
            let postArr:Post[]=data;
            postArr.forEach((post)=>{
              this.posts.push(post)
              console.log(post);
            })
          })  
        }
      
      }
    }else{
      this.getUserByLink();
    }
  }

  getUserByLink()
  {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      let userid=paramMap.get('userid');
      if(userid){
        this.api.getUserByid(userid).subscribe((data:any)=>{
          this.user=data;
          this.ngOnInit();
        })
      }
    })
  }
  getProfileUrl(){
    return this.user?.profileurl ? this.user.profileurl:this.api.profileurl;
  }

  onRequest(){
    this.api.sendFriendRequest(this.currUserid,this.user.userid).subscribe((data)=>{
      console.log('request sent',data);
      this.refresh.emit(this.user);
    })
  }
  onUnfriend(){
    this.api.removeFriendid(this.currUserid,this.user.userid).subscribe((data)=>{
      console.log('onUnfriend 1',data);
      this.api.removeFriendid(this.user.userid,this.currUserid).subscribe((data)=>{
        console.log('onUnfriend 2',data);
        this.refresh.emit(this.user);
        
      })
      
    })
    
  }
  onCancel(){
    this.api.cancelFriendRequest(this.currUserid,this.user.userid).subscribe((data)=>{
      console.log('request cancel',data);
      this.refresh.emit(this.user);

    })
  }
  
  onAccept(){
    this.api.addFriendid(this.currUserid,this.user.userid).subscribe((data)=>{
      console.log('onAccept 1',data);
      this.api.addFriendid(this.user.userid,this.currUserid).subscribe((data)=>{
        console.log('onAccept 2',data);
        this.refresh.emit(this.user);
      })
      
    })
  }

  onEditSave(){
    this.update_user.profileurl=this.newUrlOfProfile
    if(this.update_user.username.length==0){
      this.popups.openSnackbar('username cannot be empty')
    }else if(this.update_user.username.length>20){
      this.popups.openSnackbar('username length is too high');
    }else{
      this.api.updateUserProfile(this.update_user).subscribe((data:any)=>{
        console.log(data);
        this.onGoBack();
        this.user=this.update_user
        this.ngOnInit()
      })
    }
  }
  onVerifyRequest(){
    if(this.category.length==0){
      this.popups.openSnackbar('category is required')
    }else {
      this.api.addProRequest({userid:this.user.userid,"category":this.category,"description":this.detail_verify}).subscribe((data:any)=>{
        console.log(data);
        this.popups.openSnackbar('request sent to admin')
        this.onGoBack();
        this.category=''
        this.detail_verify=''
      })
    }

  }

  async upload($event: any) {
    this.spinnerService.show();
    let links: string[] = await this.uploadService.upload(
        $event.target.files,
        "profile"
    );
    this.newUrlOfProfile=links[0]
    this.spinnerService.hide();    
}

  showVerify(){
    this.isProRequest=true
  }
  showEdit(){ 
    this.isEdit=true
  }

  onGoBack(){
    this.isEdit=false
    this.isProRequest=false
  }

}
