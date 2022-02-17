import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ms-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() value : string;
  @Input() color : string;
  @Input() width : string;

  buttonStyle = {
    backgroundColor : "#8CBDB8",
    width: "auto"
  }

  constructor() { }

  ngOnInit(): void {
    this.checkButtonColor();
    this.setWidth();
  }

  checkButtonColor() {
    if(this.color) {
      if(this.color === "orange")
      this.buttonStyle.backgroundColor = "#E09E50"
      else if(this.color === "ligthblue")
      this.buttonStyle.backgroundColor = "#8CBDB8"
      else if(this.color === "blue")
      this.buttonStyle.backgroundColor = "#2D3E4E"
      else
      this.buttonStyle.backgroundColor = this.color
    }
  }

  setWidth() {
    if(this.width)
    this.buttonStyle.width = this.width;
  }

}
