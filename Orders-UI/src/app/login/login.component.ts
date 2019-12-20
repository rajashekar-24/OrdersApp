import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

constructor(private router: Router, private userService: UserService) { }

successMessage : any;
message: any;
loginView: boolean = true;
loginForm = { "email": "", "password": "" };
signupForm = { "firstName": "", "lastName": "", "email": "", "password": "", "matchPassword": "" };


//Login Form
loginFormGroup = new FormGroup({
  loginEmail: new FormControl('', [Validators.required, Validators.email]),
  loginPassword: new FormControl('', [Validators.required])
});
// Signup Form
signupFormGroup = new FormGroup({
  signupFirstName: new FormControl('', Validators.required),
  signupLastName: new FormControl('', Validators.required),
  signupEmail: new FormControl('', [Validators.required, Validators.email]),
  signupPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  signupMatchPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
})


viewToggle(data) {

  data == 'true' ? this.loginView = false : this.loginView = true;
  this.loginFormGroup.get('loginEmail').setValue('');
  this.loginFormGroup.get('loginPassword').setValue('');

  this.signupFormGroup.get('signupFirstName').setValue('');
  this.signupFormGroup.get('signupLastName').setValue('');
  this.signupFormGroup.get('signupEmail').setValue('');
  this.signupFormGroup.get('signupPassword').setValue('');
  this.signupFormGroup.get('signupMatchPassword').setValue('');
}

login() {

  this.loginForm.email = this.loginFormGroup.get('loginEmail').value;
  this.loginForm.password = this.loginFormGroup.get('loginPassword').value;

  this.userService.login(this.loginForm).subscribe((res)=>{
    console.log(`Login Response ${res}`);
    if (res.hasOwnProperty('token')) {
      window.localStorage.setItem('token', res['token']);
      window.localStorage.setItem('user_id', res['userId']);
      console.log(`Local storage token ${localStorage.getItem('token')}`);
      this.alertMessage('secondary','Successfully logged In');
      this.router.navigate(['orders']);
    }
  },error => {
       this.alertMessage('danger', error.error.message);
  })
}

signup() {
  this.loginView = false;
  this.signupForm.firstName = this.signupFormGroup.get('signupFirstName').value;
  this.signupForm.lastName = this.signupFormGroup.get('signupLastName').value;
  this.signupForm.email = this.signupFormGroup.get('signupEmail').value;
  this.signupForm.password = this.signupFormGroup.get('signupPassword').value;
  console.log(`signup form ${this.signupForm}`);
  /* POST data to Server */
  this.userService.postUser(this.signupForm).subscribe((res)=>{
      console.log("response "+ res);
      this.loginView = true;

  })
  this.router.navigate(['login']);

}

alertMessage(type,message){
  this.successMessage = {
    type: type,
    message: message,
  };
  setTimeout(()=> this.successMessage=null,1000);
}

closeAlert(){
  this.successMessage = null;
}

ngOnInit() {
}

}