import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {

  values = ["Plaisir", "Entraide", "Partage", "Convialité"]

  constructor() { }

  ngOnInit(): void {
  }

}
