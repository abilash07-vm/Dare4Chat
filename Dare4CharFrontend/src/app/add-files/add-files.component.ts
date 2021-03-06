import { Component, HostListener, OnInit } from '@angular/core';
import { Item, Post } from 'src/Interfaces/post';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

import { UploadFileService } from '../../Services/upload-file.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/Interfaces/status';
import { TouchSwipeService } from 'src/Services/touch-swipe.service';
import { PopupsService } from 'src/Services/popups.service';
import { ComponentCanDeactivate } from '../../Services/pending-changes-guard.guard'
import { Observable } from 'rxjs';

interface chip {
    name: string;
    isSelected: boolean;
}

interface TempAddData {
    selectedChip: string;
    items?: Item[];
}

@Component({
    selector: 'app-add-files',
    templateUrl: './add-files.component.html',
    styleUrls: ['./add-files.component.css'],
})
export class AddFilesComponent implements OnInit,ComponentCanDeactivate {
    selectedChip: string = '';
    items: Item[] = [];
    keywords!: chip[];
    currIndex = 0;
    maxIndex = 0;
    autoCaption:boolean=false

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
      // insert logic to check if there are pending changes here;
      // returning true will navigate without confirmation
      // returning false will show a confirm dialog before navigating away
      this.api.onOffline();
      return true;
    }

    constructor(
        public uploadService: UploadFileService,
        private authServices: AuthService,
        private api: ApiService,
        private spinnerService: NgxSpinnerService,
        private swipeService: TouchSwipeService,
        private popups:PopupsService
    ) {
        this.resetChips();
    }

    ngOnInit(): void {
        let tempDataFromLocal = this.authServices.getAddData();
        if (tempDataFromLocal) {
            let data: TempAddData = JSON.parse(tempDataFromLocal);
            if (data.selectedChip) {
                this.selectedChip = data.selectedChip;
                for (let i = 0; i < this.keywords.length; i++) {
                    if (this.keywords[i].name === this.selectedChip) {
                        this.keywords[i].isSelected = true;
                    }
                }
            }
            if (data.items) {
                this.items = data.items;
                this.maxIndex = this.items.length;
            }
        }
    }

    async upload($event: any) {
        this.spinnerService.show();
        let links: string[] = await this.uploadService.upload(
            $event.target.files,
            this.selectedChip
        );
        for (let i = 0; i < links.length; i++) {
            this.items.push({ url: links[i], caption: '' });
        }
        this.storeToLocalStorage();
        this.spinnerService.hide();
        this.maxIndex = this.items.length;
        
    }
    onChipClick(keyword: chip) {
        this.selectedChip = keyword.name;
        let index = this.keywords.indexOf(keyword);
        this.resetChips();
        this.keywords[index].isSelected = true;
        let temp: TempAddData = {
            selectedChip: this.selectedChip,
        };
        this.authServices.setAddData(JSON.stringify(temp));
    }
    onCaptionChange(index: number, $event: any) {
        
        this.items[index].caption = $event.target.value;
        this.storeToLocalStorage();
    }
    onAutoCaption(){
        let count=0;
        if(this.autoCaption && this.items[this.currIndex].caption.length>0){
            for(let i=0;i<this.items.length;i++){
                if(this.items[i].caption.length==0){
                    this.items[i].caption=this.items[this.currIndex].caption
                    count+=1
                }
            }
            if(count==0){
                this.popups.openSnackbar("There is no empty captions box")
            }else{
                this.popups.openSnackbar(`${count} captions changed`)
            }
        }else if(this.items[this.currIndex].caption.length==0){
            this.popups.openSnackbar("Caption is empty")
        }
        
    }

    resetChips() {
        this.keywords = [
            { name: 'Post', isSelected: false },
            { name: 'Status', isSelected: false },
            { name: 'Both', isSelected: false },
        ];
    }

    onDelete(){
        this.items.splice(this.currIndex,1);
        
        
        this.maxIndex-=1
        this.currIndex=Math.max(Math.min(this.currIndex,this.maxIndex-1),0)
        this.storeToLocalStorage();
    }

    onDotClick(index:number){
        this.currIndex=index
    }

    onTouch(when: string, touch: TouchEvent) {
        this.currIndex = this.swipeService.getSwipe(when, touch,this.currIndex,this.maxIndex);
    }
    onDrag(when: string, drag: MouseEvent) {
        this.currIndex = this.swipeService.getMouseSwipe(when, drag,this.currIndex,this.maxIndex);
    }
    
    onReset() {
        this.authServices.delAddData();
        window.location.reload();
    }
    numSequence(n: number): Array<number> {
        return Array(n);
    }

    storeToLocalStorage() {
        let temp: TempAddData = {
            selectedChip: this.selectedChip,
            items: this.items,
        };
        this.authServices.setAddData(JSON.stringify(temp));
    }
    
    onFinish() {
        let userId = this.authServices.getUserId() || "admin";
        if(this.items.length>10){
            this.popups.openSnackbar('maximum 10 images are allowed')
        }

        if (this.selectedChip === 'Post' || this.selectedChip === 'Both') {
            let data: Post = {
                items: this.items,
                userid: userId,
                date: new Date(),
                likes: 0,
                likeids:[],
                comments: [],
            };
            this.api.addPost(data).subscribe((data_server: any) => {
                let data_mongo: Post = data_server;
                this.popups.openSnackbar('Added sucessfully!!!')
                setTimeout(()=>{
                    this.api.updateUserForLocalStorage()
                    this.onReset()
                },1000)
                
            });
        } 
        if (this.selectedChip === 'Status' || this.selectedChip === 'Both') {
            this.items.forEach(item=> {
                let status:Status={
                    item: item,
                    userid: userId,
                    date: new Date(),
                    views: 0,
                    viewsids:[]
                }
                this.api.addStatus(status).subscribe((data_server: any) => {
                    this.popups.openSnackbar('Added sucessfully!!!')
                    this.api.updateUserForLocalStorage()
                    setTimeout(()=>{
                        this.onReset()
                    },1000)                    
                });
            })
        }

        this.authServices.delAddData();
    }
}

