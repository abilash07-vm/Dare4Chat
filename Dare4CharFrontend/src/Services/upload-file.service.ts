import { Injectable } from '@angular/core';

import {
    AngularFireStorage,
    AngularFireStorageReference,
} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root',
})
export class UploadFileService {
    ref!: AngularFireStorageReference;

    constructor(private storage: AngularFireStorage) {}

    async upload(files: File[], folderName: string) {
        this.ref = this.storage.ref(folderName);
        let links: string[] = [];
        if (files && files[0]) {
            for (let i = 0; i < files.length; i++) {
                let link = await this.uploadToStorageAndGetLink(
                    this.ref,
                    files[i]
                );
                links.push(link);
            }
        }
        return links;
    }
    uploadToStorageAndGetLink(
        ref: AngularFireStorageReference,
        file: File
    ): string {
        let tempRef = ref.child(file.name).put(file);
        return tempRef
            .then((snapshot: any) => {
                let linkRef: AngularFireStorageReference = this.ref.child(
                    file.name
                );
                return new Promise((resolve) => {
                    linkRef.getDownloadURL().subscribe((url: any) => {
                        
                        resolve(url);
                        //   this.contactFormGroup.controls['photourl'].setValue(url);
                    });
                });
            })
            .then((url: string) => {
                return url;
            });
    }
}
