import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-sport-pictures-direction',
  templateUrl: './sport-pictures-direction.component.html',
  styleUrls: ['./sport-pictures-direction.component.scss']
})
export class SportPicturesDirectionComponent implements OnInit {

  members = [
    "thierry",
    "thomas",
    "violaine",
    "antoine",
    "martin",
    "simon",
    "justine",
    "fanny"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
