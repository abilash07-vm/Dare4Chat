import { Component, OnInit } from '@angular/core';
import { Item, Post } from 'src/Interfaces/post';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

import { UploadFileService } from '../../Services/upload-file.service';

import { NgxSpinnerService } from 'ngx-spinner';

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
    constructor(
        public uploadService: UploadFileService,
        private authServices: AuthService,
        private apiServices: ApiService,
        private spinnerService: NgxSpinnerService
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
            }
        }
    }

    async upload($event: any) {
        this.spinnerService.show();
        let links: string[] = await this.uploadService.upload(
            $event.target.files,
            'post'
        );
        for (let i = 0; i < links.length; i++) {
            this.items.push({ url: links[i], caption: '' });
        }
        let temp: TempAddData = {
            selectedChip: this.selectedChip,
            items: this.items,
        };
        this.authServices.setAddData(JSON.stringify(temp));
        this.spinnerService.hide();
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
        this.items[index].caption = $event.target.value;
    }
    resetChips() {
        this.keywords = [
            { name: 'Post', isSelected: false },
            { name: 'Status', isSelected: false },
            { name: 'Both', isSelected: false },
        ];
    }
    onReset() {
        this.authServices.delAddData();
        window.location.reload();
    }
    onFinish() {
        let userId = this.authServices.getUserId() || 'admin';
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
        this.authServices.delAddData();
    }
}
