import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';


// Modale de chargement d'images
@Component({
  selector: 'upload-picture-modale',
  templateUrl: './upload-picture-modale.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureModale {

  files: any[];

  constructor(public activeModal: NgbActiveModal) { }

  loadFiles(e) {
    // TODO: refuser les fichiers qui sont pas JPG, PNG ou GIF
    this.files = Array.from(e.target.files);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  sendFiles() {
    if (!this.files || this.files.length <= 0) {
      //TODO: notif admin pas de fichiers, abort mission
      console.log("pas de fichiers");
      return;
    }
    this.activeModal.close(this.files);
  }

  convertOtoMo(o) {
    const ko = o / 1000;
    return ko > 1000 ? `${(ko / 1000).toFixed(2)} Mo` : `${ko.toFixed(2)} ko`;
  }


}

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  @Output() pictureUploadedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private pictureService: PictureService) { }

  ngOnInit(): void {
  }

  openModale() {
    const modalRef = this.modalService.open(UploadPictureModale, { centered: true });
    modalRef.result.then(images => {
      this.uploadFiles(images);
    })
  }

  uploadFiles(images: any[]) {
    const formData = new FormData();
    images.forEach(file => {
      formData.append('images', file);
    })

    this.pictureService.upload(formData).subscribe(_ => {
      this.pictureUploadedEvent.emit();
    },
      err => {
        console.warn(err);
      });
  }
}
