import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToLegal() {
    this.router.navigateByUrl("/legal")
  }

}
