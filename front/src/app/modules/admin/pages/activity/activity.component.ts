import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  editActivityForm = this.fb.group({
    name: ["", Validators.required],
    description: [""],
    rules: [""],
    duration: [0, Validators.required],
    points: [0, Validators.required]
  })

  constructor(
    private fb : FormBuilder,
    private activityService : ActivityService
  ) { }

  ngOnInit(): void {
  }

  addActivity() {
    this.activityService.addActivity(this.editActivityForm.value).subscribe(() => {
      console.log('OK');
    })
  }

}
