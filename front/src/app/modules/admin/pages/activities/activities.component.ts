import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';
import { EventService } from 'src/app/modules/ms-api/event/event.service';
import { DeleteModalComponent } from 'src/app/modules/ms-ui/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[];
  activitiesEventsNb: Object;

  constructor(
    private activityService: ActivityService,
    private eventService: EventService,
    private router: Router,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.initActivities();
  }

  initActivities() {
    this.activityService.findAll().subscribe(data => {
      this.activities = data;  
      this.initActivitiesEvent();    
    })
  }

  initActivitiesEvent() {
    this.activitiesEventsNb = new Object();
    for (let activity of this.activities) {
      let activityId = activity._id;
      this.eventService.findByActivity(activityId).subscribe(data => {
        this.activitiesEventsNb[activityId] = data.length;     
        console.log(this.activitiesEventsNb); 
      })
    }      
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
