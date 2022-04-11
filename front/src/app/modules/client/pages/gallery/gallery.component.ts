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
  loading = true;

  ngOnInit(): void {
    this.pictureService.findAll().subscribe(
      result => {
        this.loading = false;
        this.pictures = result;
      },
      err => {
        this.loading = false;
        console.warn(err);
      }
    )
  }

}
