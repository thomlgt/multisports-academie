import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrls: ['./activity-thumbnail.component.scss']
})
export class ActivityThumbnailComponent implements OnInit {

  // TODO: récupérer l'objet 'Activity' depuis le parent dans le ngFor
  @Input() num;

  constructor() { }

  ngOnInit(): void {
  }

  goToActivityDetailsPage() {
    // TODO: implémenter cette redirection
    console.log(`redirection vers la page détail de l'activité ${this.num}`);
  }

}
