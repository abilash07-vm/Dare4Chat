import { Component, OnInit } from '@angular/core';

import { UploadFileService } from '../../Services/upload-file.service';

@Component({
    selector: 'app-add-files',
    templateUrl: './add-files.component.html',
    styleUrls: ['./add-files.component.css'],
})
export class AddFilesComponent implements OnInit {
    constructor(public uploadService: UploadFileService) {}

    ngOnInit(): void {}

    async upload($event: any) {
        let links: string[] = await this.uploadService.upload(
            $event.target.files,
            'temp'
        );
        console.log(`from add files component: ${links}`);

        console.log(`from add files component length: ${links.length}`);
    }
}
