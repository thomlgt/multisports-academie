import { Component, Input, OnInit } from '@angular/core';
import { Captain } from 'src/app/models/captain/captain';

@Component({
  selector: 'ms-display-admin-captain',
  templateUrl: './display-admin-captain.component.html',
  styleUrls: ['./display-admin-captain.component.scss']
})
export class DisplayAdminCaptainComponent implements OnInit {

  @Input() captain : Captain;

  constructor() { }

  ngOnInit(): void {
  }

}
