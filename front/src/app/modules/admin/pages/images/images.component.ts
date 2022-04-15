import { Component, OnInit } from '@angular/core';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  pictures : any[];
  loading = true;

  constructor(private pictureService: PictureService) { }

  ngOnInit(): void {
    this.reloadGallery()
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
