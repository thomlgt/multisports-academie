import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';
import { DeleteModalComponent } from 'src/app/modules/ms-ui/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[];

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.initActivities();
  }

  initActivities() {
    this.activityService.findAll().subscribe(data => {
      this.activities = data;
      console.log(data);
    })
  }

  /** CRUD */

  goToAddActivity() {
    this.router.navigateByUrl(`/admin/activity`);
  }

  goToEditActivity(id: string) {
    this.router.navigateByUrl(`/admin/activity/${id}`);
  }

  openDelationModal(id: string, name: string) {
    const modalRef = this.modalService.open(DeleteModalComponent, {centered : true});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = 'Activité - ' + name;
    modalRef.componentInstance.content = 'Êtes-vous sûr de vouloir supprimer cette activité ?';
    modalRef.componentInstance.deleteItem.subscribe(() => {
      this.activityService.deleteActivity(id).subscribe(() => {
        window.location.reload();
      })      
    });
  }

}
