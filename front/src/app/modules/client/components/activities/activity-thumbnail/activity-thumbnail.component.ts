import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity/activity.model';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrls: ['./activity-thumbnail.component.scss']
})
export class ActivityThumbnailComponent implements OnInit {

  // TODO: récupérer l'objet 'Activity' depuis le parent dans le ngFor
  @Input() activity: Activity;

  constructor() { }

  ngOnInit(): void {
    console.log(this.activity);
  }

  goToActivityDetailsPage() {
    // TODO: implémenter cette redirection
    console.log(`redirection vers la page détail de l'activité ${this.activity.name}`);
  }

}
