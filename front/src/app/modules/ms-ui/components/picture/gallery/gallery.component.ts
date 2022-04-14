import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Picture } from 'src/app/models/picture/picture.model';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';

@Component({
  selector: 'picture-modale',
  template: `
    <div class="modal-body gallery-modale">

      <div class="control close"
              aria-label="Close"
              (click)="activeModal.dismiss('Cross click')">X</div>

      <section class="photo">

        <div class="control navigation"
        (click)="slidePicture(-1)">
          <
        </div>

        <img [src]="pictures[index].url"
            [alt]="pictures[index].altText"
            [title]="pictures[index].altText">

        <div class="control navigation"
        (click)="slidePicture(1)">
        >
        </div>
        
      </section>

    </div>
  `,
})
export class PictureModale {
  @Input() pictures: Picture[];
  @Input() index: number;

  constructor(public activeModal: NgbActiveModal) { }

  /**
   * permet de changer la photo affichée dans la modale
   * @param value 1=suivante, -1=precédente
   */
  slidePicture(value: number) {
    let i = this.index + value;
    if (i < 0) {
      // si on appelle previous et que c'est la première image, on affiche la dernière
      i = this.pictures.length - 1;
    } else if (i > this.pictures.length - 1) {
      // si on appelle next et que c'est la dernière image, on affiche la première
      i = 0;
    }
    this.index = i;
  }
}



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() pictures: Picture[];
  @Input() loading: boolean;

  @Output() pictureListModified: EventEmitter<any> = new EventEmitter();

  isAdmin = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private pictureService : PictureService) { }

  ngOnInit(): void {
    if (this.router.url.split("/")[1] === "admin") {
      this.isAdmin = true;
    }
  }

  openModal(index: number) {
    const modalRef = this.modalService.open(PictureModale, { centered: true, size: 'xl' });
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.pictures = this.pictures;
  }

  deletePicture(id: string) {
    if (!this.isAdmin) {
      //TODO: logger la tentative de suppression illégale
      return;
    }

    this.pictureService.delete(id).subscribe(_ => {
      this.pictureListModified.emit();
    },
    err => {
      console.warn(err);
    });

  }
}
