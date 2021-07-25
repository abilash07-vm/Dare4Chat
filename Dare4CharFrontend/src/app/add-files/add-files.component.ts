import { Component, OnInit } from '@angular/core';

import { UploadFileService } from '../../Services/upload-file.service';

interface chip {
    name: string;
    isSelected: boolean;
}
interface initialpost {
    url: string;
    caption: string;
}

@Component({
    selector: 'app-add-files',
    templateUrl: './add-files.component.html',
    styleUrls: ['./add-files.component.css'],
})
export class AddFilesComponent implements OnInit {
    selectedChip: string = '';
    items: initialpost[] = [];
    keywords!: chip[];
    constructor(public uploadService: UploadFileService) {
        this.resetChips();
    }

    ngOnInit(): void {}

    async upload($event: any) {
        let links: string[] = await this.uploadService.upload(
            $event.target.files,
            'temp'
        );
        for (let i = 0; i < links.length; i++) {
            this.items.push({ url: links[i], caption: '' });
        }
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
        console.log(this.items);
    }
}
