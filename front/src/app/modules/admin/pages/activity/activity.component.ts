import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  id: string|null;
  editActivityForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private activityService : ActivityService,
    private route : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.buildEditForm();
  }

  buildEditForm() {
    if (this.id) {
      this.activityService.findById(this.id).subscribe(data => {
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

}
