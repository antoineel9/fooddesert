import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from '../shared/services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthorizeService, private router: Router) { }

  // Class properties
  error: string = '';

  // Setup form control vars
  loginForm = new FormGroup({
    emailCtl: new FormControl('', [Validators.email, Validators.required]),
    passwordCtl: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  
  }

  btnLoginClicked() {
    // Clear out any previous error (if any)
    this.error = '';

    // Get input from screen
    const email = this.loginForm.value.emailCtl;
    const password = this.loginForm.value.passwordCtl;

    // Call the authenticate service
    this.authService.authorize(email, password).subscribe((res) => {
      if(!res) {
        this.error = 'Error occurred, please try again later';
        return;
      }

      this.authService.setToken(res.jwt);
      this.authService.setUser(res.user);
      console.log('authorized');
      this.router.navigate(['/resource']);
    },
    (error) => {
      console.dir(error);
      this.error = `Email or password is invalid`;
        return;
    });
  }

}
