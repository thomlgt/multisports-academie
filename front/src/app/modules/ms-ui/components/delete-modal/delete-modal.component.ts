import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() id : string;
  @Input() title : string;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    public activityService: ActivityService
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.activityService.deleteActivity(this.id).subscribe(() => {
      this.router.navigateByUrl(`/admin/activities`);
      this.activeModal.close();
    })
  }

}
