import { Component, OnInit } from '@angular/core';
import { Item, Post } from 'src/Interfaces/post';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

import { UploadFileService } from '../../Services/upload-file.service';

interface chip {
    name: string;
    isSelected: boolean;
}

@Component({
    selector: 'app-add-files',
    templateUrl: './add-files.component.html',
    styleUrls: ['./add-files.component.css'],
})
export class AddFilesComponent implements OnInit {
    selectedChip: string = '';
    isLoading = false;
    items: Item[] = [];
    keywords!: chip[];
    constructor(
        public uploadService: UploadFileService,
        private authServices: AuthService,
        private apiServices: ApiService
    ) {
        this.resetChips();
    }

    ngOnInit(): void {}

    async upload($event: any) {
        this.isLoading = true;
        let links: string[] = await this.uploadService.upload(
            $event.target.files,
            'post'
        );
        for (let i = 0; i < links.length; i++) {
            this.items.push({ url: links[i], caption: '' });
        }
        this.isLoading = false;
        console.log(`from add files component: ${links}`);

        console.log(`from add files component length: ${links.length}`);
    }
    onChipClick(keyword: chip) {
        this.selectedChip = keyword.name;
        let index = this.keywords.indexOf(keyword);
        this.resetChips();
        this.keywords[index].isSelected = true;
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
    }
}
