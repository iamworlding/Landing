import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/users.service';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})

export class JoinComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    joinTerms = false;
    copyrightYear = new Date().getFullYear();

    constructor(private formBuilder: FormBuilder,
      private router: Router,
      private translate: TranslateService,
      private user: UserService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.user.userJoin(this.registerForm.value.name, this.registerForm.value.email).subscribe(res => {
          console.log(res);
          if (res.message === 'Register completed') {
            if (this.translate.getBrowserLang() === 'en') {
              alert(this.registerForm.value.name + ', thanks for your registration!');
            } else {
              alert('¡' + this.registerForm.value.name + ', gracias por tu registro!');
            }
          } else {
            if (this.translate.getBrowserLang() === 'en') {
              alert(this.registerForm.value.name + ', this email is registered!');
              return;
            } else {
              alert('¡' + this.registerForm.value.name + ', este email esta registrado!');
              return;
            }
          }
        });

        this.router.navigate(['/']);
    }

    activateJoinButton() {
      this.joinTerms = !this.joinTerms;
    }
}

