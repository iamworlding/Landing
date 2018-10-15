import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

    constructor(private formBuilder: FormBuilder, private router: Router) { }

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

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

        this.router.navigate(['/']);
    }

    activateJoinButton() {
      this.joinTerms = !this.joinTerms;
    }
}

