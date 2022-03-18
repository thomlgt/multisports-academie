import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture/picture.model';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryPageComponent implements OnInit {

  constructor(private pictureService: PictureService) { }

  pictures: Picture[];

  ngOnInit(): void {
    this.pictureService.findAll().subscribe(
      result => {
        this.pictures = result;
      },
      err => {
        console.warn(err);
      }
    )
  }

}
