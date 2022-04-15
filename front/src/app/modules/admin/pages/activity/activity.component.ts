import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';
import { DeleteModalComponent } from 'src/app/modules/ms-ui/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  id: string|null;
  activity: Activity|null;
  editActivityForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private activityService : ActivityService,
    private route : ActivatedRoute,
    private router: Router,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.buildEditForm();
  }

  buildEditForm() {
    if (this.id) {
      this.activityService.findById(this.id).subscribe(data => {
        this.activity = data;
        this.editActivityForm = this.fb.group({
          name: [data.name, Validators.required],
          description: [data.description],
          rules: [data.rules],
          duration: [data.duration, Validators.required],
          points: [data.points, Validators.required]
        })
      })
    } else {
      this.editActivityForm = this.fb.group({
        name: ["", Validators.required],
        description: [""],
        rules: [""],
        duration: [0, Validators.required],
        points: [0, Validators.required]
      })
    }       
  }

  addActivity() {
    this.activityService.addActivity(this.editActivityForm.value).subscribe((res: Activity) => {
      this.router.navigateByUrl(`/admin/activity/${res._id}`);
    })
  }

  updateActivity() {
    this.activityService.updateActivity(this.id, this.editActivityForm.value).subscribe((res: Activity) => {
    })
  }

  openDelationModal() {
    const modalRef = this.modalService.open(DeleteModalComponent, {centered : true});
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.title = 'Activité - ' + this.activity.name;
    modalRef.componentInstance.content = 'Êtes-vous sûr de vouloir supprimer cette activité ?';
    modalRef.componentInstance.deleteItem.subscribe(() => {
      this.activityService.deleteActivity(this.id).subscribe(() => {
        this.router.navigateByUrl(`/admin/activities`);
      })      
    });
  }

}
