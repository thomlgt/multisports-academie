import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  id: string;
  eventId: string|null;
  activity: Activity;
  show: string;

  constructor(
    private activityService: ActivityService,
    private route : ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventId = this.route.snapshot.params['eventid'];
    this.initActivity();
    this.show = "description";
  }

  initActivity() {
    this.activityService.findById(this.id).subscribe(data => {
      this.activity = data;
    })    
  }

  goToEvent() {
    this.router.navigateByUrl(`/event/${this.eventId}`);
  }

}