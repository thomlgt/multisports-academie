import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity/activity.model';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  id: string;
  activity: Activity;
  show: string;

  constructor(
    private activityService: ActivityService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initActivity();
    this.show = "description";
  }

  initActivity() {
    this.activityService.findById(this.id).subscribe(data => {
      this.activity = data;
      console.log(data);
    })    
  }

}