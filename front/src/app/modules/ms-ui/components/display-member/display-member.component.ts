import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/models/members/member';

@Component({
  selector: 'ms-display-member',
  templateUrl: './display-member.component.html',
  styleUrls: ['./display-member.component.css']
})
export class DisplayMemberComponent implements OnInit {

  @Input() member : Member
  @Output() deleteMemberEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteMember() {
    this.deleteMemberEvent.emit();
  }

}
