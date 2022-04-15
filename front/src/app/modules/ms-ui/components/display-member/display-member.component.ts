import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/members/member';

@Component({
  selector: 'ms-display-member',
  templateUrl: './display-member.component.html',
  styleUrls: ['./display-member.component.css']
})
export class DisplayMemberComponent implements OnInit {

  @Input() member : Member
  @Output() deleteMemberEvent = new EventEmitter<void>();
  displayDeleteButton = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.router.url.split("/")[1] === "admin") {
      this.displayDeleteButton = false;
    }
  }

  deleteMember() {
    this.deleteMemberEvent.emit();
  }

}
