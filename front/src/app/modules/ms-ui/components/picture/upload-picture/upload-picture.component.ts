import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  @Output() pictureUploadedEvent : EventEmitter<any> = new EventEmitter();

  files: any[];

  constructor(private pictureService: PictureService ) { }

  ngOnInit(): void {
  }

  loadFiles(e) {
    this.files = e.target.files;
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
      this.pictureUploadedEvent.emit();
    },
      err => {
        console.warn(err);
      });
  }

}
