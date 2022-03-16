import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private scroller: ViewportScroller,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(frag => {
      this.scroller.scrollToAnchor(frag);
    })
    
  }

}
