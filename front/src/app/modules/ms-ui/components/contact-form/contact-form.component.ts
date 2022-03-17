import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/modules/ms-api/contact/contact.service';

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
    phone : ["", [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    subject : ["", Validators.required],
    message : ["", Validators.required],
  })

  formErrors = false;
  sendErrors = false;
  sendConfirmation = false;
  waiting = false;

  constructor(
    private fb : FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  get form() { 
    return this.contactForm.controls; 
  }

  sendContactForm() {
    this.waiting = true;
    if(this.contactForm.valid) {
      this.contactService.sendContact(this.contactForm.value).subscribe(
        next => {
          this.contactForm.reset();
          this.waiting = false;
          this.sendConfirmation = true;
          setTimeout(() => {
            this.sendConfirmation = false;
          }, 30000)
        },
        error => {
          this.sendErrors = true
        }
      );
    } else {
      this.formErrors = true;
      this.waiting = false;
    }
  }

}
