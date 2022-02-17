import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigateByUrl("")
  }

  goToContact() {
    this.router.navigateByUrl("")
  }

  goToEvents() {
    this.router.navigateByUrl("/events")
  }

}
