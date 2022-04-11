import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ms-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

@Input() vertical: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
