import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Picture } from 'src/app/models/picture/picture.model';

@Component({
  selector: 'picture-modale',
  template: `
    <div class="modal-body">
    <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
      <img [src]="pictures[index].url"
         [alt]="pictures[index].altText">
    </div>
  `,
  styleUrls: ['./picture-modale.scss']
})
export class PictureModale {
  @Input() pictures: Picture[];
  @Input() index: number;

  constructor(public activeModal: NgbActiveModal) { }
}



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() pictures: Picture[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(index: number) {
    const modalRef = this.modalService.open(PictureModale, { centered: true, size: 'xl'});
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.pictures = this.pictures;
  }
}
