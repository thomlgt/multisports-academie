import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

@Component({
  selector: 'ms-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  elements = [
    { link: '/admin/board', name: 'Tableau de bord', isActive: false },
    { link: '/admin/captains', name: 'Capitaines', isActive: false },
    { link: '/admin/images', name: 'Images', isActive: false },
    { link: '/admin/activities', name: 'Activités', isActive: false },
    { link: '/admin/events', name: 'Évènement', isActive: false },
    { link: '/admin/articles', name: 'Actualités', isActive: false },
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { 

  }

  ngOnInit(): void {
    this.initActives();
  }

  goTo(element) {
    this.router.navigateByUrl(element.link)
    this.resetActives();
    this.elements.filter(elem => elem.name === element.name)[0].isActive = true;
  }

  initActives() {
    this.elements.forEach(element => {
      if(element.link === this.router.url) {
        element.isActive = true;
      }
    })
  }

  resetActives() {
    this.elements.forEach(element => {
      element.isActive = false;
    })
  }

}
