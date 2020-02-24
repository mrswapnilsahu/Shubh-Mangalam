import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  formSubmit() {
    console.log(this.loginForm['userName']);
  }

}
