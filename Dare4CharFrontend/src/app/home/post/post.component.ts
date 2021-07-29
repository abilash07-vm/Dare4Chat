import { Component, OnInit } from '@angular/core';
import { Post } from 'src/Interfaces/post';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts:Post[]=[]
  constructor(private api:ApiService) { 
    api.getAllpost().subscribe((data:any)=>{
      this.posts=data;
    })
  }

  ngOnInit(): void {
  }

}
