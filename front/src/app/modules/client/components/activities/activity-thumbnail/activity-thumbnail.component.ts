import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity/activity.model';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrls: ['./activity-thumbnail.component.scss']
})
export class ActivityThumbnailComponent implements OnInit {

  @Input() activity: Activity;
  @Input() event: Event;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToActivityDetailsPage() {
    this.router.navigateByUrl(`event/${this.event._id}/activities/${this.activity._id}`);
  }

}