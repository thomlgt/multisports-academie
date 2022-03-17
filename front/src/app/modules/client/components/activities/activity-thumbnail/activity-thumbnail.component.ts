import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity/activity.model';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrls: ['./activity-thumbnail.component.scss']
})
export class ActivityThumbnailComponent implements OnInit {

  @Input() activity: Activity;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.activity);
  }

  goToActivityDetailsPage() {
    this.router.navigateByUrl(`/activity/${this.activity._id}`);
  }

}