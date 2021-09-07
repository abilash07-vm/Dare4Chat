import { Component, OnInit } from '@angular/core';
import { Pro, User} from 'src/Interfaces/user';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css']
})
export class ProListComponent implements OnInit {
  pro_users:Pro[]=[]
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getAllProRequest().subscribe((reqs:any)=>{
      
      this.pro_users=reqs
      this.updateUser()
    })
  }

  updateUser(){
    for(let i=0;i<this.pro_users.length;i++){
      let userid=this.pro_users[i].userid;
      this.api.getUserByid(userid).subscribe((data:any)=>{
        this.pro_users[i].user=data
      })
    }
  }

  onClickUser(user:User){

  }

  getProfile(proreq:Pro){
    return proreq.user?.profileurl ? proreq.user.profileurl: this.api.profileurl;
  }

  onAccept(pro:Pro){
    this.api.updateUserProDetail(pro).subscribe((data)=>{
      
      this.api.deleteProRequest(pro.userid).subscribe(()=>{
        
        this.ngOnInit();        
      })
    })
  }

  onReject(pro:Pro){
    this.api.deleteProRequest(pro.userid).subscribe((data)=>{
      
      
      this.ngOnInit();
    })
  }

}
