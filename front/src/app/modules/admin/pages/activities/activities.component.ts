import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[];

  constructor(
    private activityService: ActivityService,
    private router: Router
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

  /** Add activity redirection */

  goToAddActivity() {
    this.router.navigateByUrl(`/admin/activity`);
  }

  goToEditActivity(id: string) {
    this.router.navigateByUrl(`/admin/activity/${id}`);
  }

}
