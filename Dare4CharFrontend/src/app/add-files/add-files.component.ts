import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { UploadFileService } from '../../Services/upload-file.service';

@Component({
    selector: 'app-add-files',
    templateUrl: './add-files.component.html',
    styleUrls: ['./add-files.component.css'],
})
export class AddFilesComponent implements OnInit {
    constructor(public uploadService: UploadFileService) {}
    keywords = new Set(['angular', 'how-to', 'tutorial']);
    formControl = new FormControl(['angular']);
    ngOnInit(): void {}

    addKeywordFromInput(event: MatChipInputEvent) {
        if (event.value) {
            this.keywords.add(event.value);
            event.chipInput!.clear();
        }
    }
    removeKeyword(keyword: string) {
        this.keywords.delete(keyword);
    }

    async upload($event: any) {
        let links: string[] = await this.uploadService.upload(
            $event.target.files,
            'temp'
        );
        console.log(`from add files component: ${links}`);

        console.log(`from add files component length: ${links.length}`);
    }
}
