import { Component, OnInit } from '@angular/core';
import { Captain } from 'src/app/models/captain/captain';
import { CaptainService } from 'src/app/modules/ms-api/captain/captain.service';

@Component({
  selector: 'app-captains',
  templateUrl: './captains.component.html',
  styleUrls: ['./captains.component.scss']
})
export class CaptainsComponent implements OnInit {

  captains : Captain[];

  constructor(private captainService: CaptainService) { }

  ngOnInit(): void {
    this.initCaptains();
  }

  initCaptains() {
    this.captainService.findAll().subscribe(data => {
      this.captains = data;
    })
  }

}
