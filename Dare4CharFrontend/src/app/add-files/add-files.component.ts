import { Component, OnInit } from '@angular/core';
import { Item, Post } from 'src/Interfaces/post';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

import { UploadFileService } from '../../Services/upload-file.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/Interfaces/status';
import { TouchSwipeService } from 'src/Services/touch-swipe.service';

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
export class AddFilesComponent implements OnInit {
    selectedChip: string = '';
    items: Item[] = [];
    keywords!: chip[];
    currIndex = 0;
    maxIndex = 0;
    constructor(
        public uploadService: UploadFileService,
        private authServices: AuthService,
        private apiServices: ApiService,
        private spinnerService: NgxSpinnerService,
        public swipeService: TouchSwipeService
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
    temp(i:number,j:number){
        console.log(`${i} , ${j}`);
        
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
        console.log(`from add files component: ${links}`);

        console.log(`from add files component length: ${links.length}`);
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
        console.log(`changing ${index}`);
        this.items[index].caption = $event.target.value;
        this.storeToLocalStorage();
    }
    resetChips() {
        this.keywords = [
            { name: 'Post', isSelected: false },
            { name: 'Status', isSelected: false },
            { name: 'Both', isSelected: false },
        ];
    }
    onTouch(when: string, touch: TouchEvent) {
        this.currIndex = this.swipeService.getSwipe(when, touch,this.currIndex,this.maxIndex);

    }
    onDrag(when: string, drag: MouseEvent) {
        this.currIndex = this.swipeService.getMouseSwipe(when, drag,this.currIndex,this.maxIndex);
    }
    moveNext(){
        if(this.currIndex<this.maxIndex-1)
        this.currIndex+=1
    }
    movePrev(){
        if(this.currIndex>0)
        this.currIndex-=1
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
        let userId = this.authServices.getUserId() || 'admin';
        if (this.selectedChip === 'Post' || this.selectedChip === 'Both') {
            let data: Post = {
                items: this.items,
                userid: userId,
                date: new Date(),
                likes: 0,
                comments: [],
            };
            this.apiServices.addPost(data).subscribe((data_server: any) => {
                let data_mongo: Post = data_server;
                console.log('Added post !!!!' + data_mongo);
            });
        } else if (
            this.selectedChip === 'Status' ||
            this.selectedChip === 'Both'
        ) {
            let data: Status = {
                items: this.items,
                userid: userId,
                date: new Date(),
                views: 0,
            };
            this.apiServices.addStatus(data).subscribe((data_server: any) => {
                let data_mongo: Post = data_server;
                console.log('Added status !!!!' + data_mongo);
            });
        }

        this.authServices.delAddData();
    }
}

