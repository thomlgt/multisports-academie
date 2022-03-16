import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ms-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm = this.fb.group({
    firstname : ["", Validators.required],
    lastname : ["", Validators.required],
    email : ["", Validators.email],
    phone : ["", Validators.required],
    subject : ["", Validators.required],
    message : ["", Validators.required],
  })

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get form() { 
    return this.contactForm.controls; 
  }

  sendContactForm() {

  }

}
