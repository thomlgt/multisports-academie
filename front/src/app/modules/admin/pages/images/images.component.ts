import { Component, OnInit } from '@angular/core';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  files : any[];
  pictures : any[];
  loading = true;

  constructor(private pictureService: PictureService) { }

  ngOnInit(): void {
    this.reloadGallery()
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
      this.reloadGallery()
    },
    err => {
      console.warn(err);
    });
  }

  reloadGallery() {
    this.pictureService.findAll().subscribe(
      res => {
        this.pictures = res;
        this.loading = false;
      },
      err => {
        console.warn(err);
        this.loading = false;
      }
    )
  }
}
