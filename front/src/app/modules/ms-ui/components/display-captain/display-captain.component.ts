import { Component, Input, OnInit } from '@angular/core';
import { Captain } from 'src/app/models/captain/captain';

@Component({
  selector: 'ms-display-captain',
  templateUrl: './display-captain.component.html',
  styleUrls: ['./display-captain.component.css']
})
export class DisplayCaptainComponent implements OnInit {

  @Input() captain : Captain

  constructor() { }

  ngOnInit(): void {
  }

}
