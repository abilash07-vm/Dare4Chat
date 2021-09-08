import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.css']
})
export class SharedialogComponent implements OnInit {
  loc: String[] = [];
  l=['chennai','mumbai','kochi']
  constructor() { }

  ngOnInit(): void {
  }

  onCheck(city:string){
    let ind=this.loc.indexOf(city)
    if(ind>=0){
      this.loc.splice(ind,1);
    }else{
      this.loc.push(city);
    }
  }

}
