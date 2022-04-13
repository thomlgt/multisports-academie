import { Component, Input, OnInit } from '@angular/core';
import { Registration } from 'src/app/models/event/registration';

@Component({
  selector: 'ms-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.scss']
})
export class TeamsDetailsComponent implements OnInit {

  @Input() registrations: Registration[];

  constructor() { }

  ngOnInit(): void {
  }

}
