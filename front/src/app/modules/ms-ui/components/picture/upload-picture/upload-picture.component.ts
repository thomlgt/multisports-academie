import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  files: any[];
  pictureService: any;

  constructor() { }

  ngOnInit(): void {
  }

  loadFiles(e) {
    this.files = e.target.files;
    console.log(this.files);
  }

  sendFiles() {
    if (!this.files || this.files.length <= 0) {
      //TODO: notif admin pas de fichiers, abort mission
      console.log("pas de fichiers");
      return;
    }

    const formData = new FormData();
    Array.from(this.files).forEach(file => {
      formData.append('images', file);
    })

    this.pictureService.upload(formData).subscribe(res => {
      console.log(res);
      // this.reloadGallery()
      // TODO : emit event for page to reload gallery
    },
      err => {
        console.warn(err);
      });
  }

}
