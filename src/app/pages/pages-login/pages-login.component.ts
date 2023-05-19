import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class LoginComponent {

  loginObj:any = {
    email: '',
    password: '',
  }

  constructor(private router: Router) {}

  onLogin(): void {
    const url ='http://localhost:3000/api/user/login';
    const { email, password } = this.loginObj;

    axios.post(url, { email, password })
      .then(response => {
        localStorage.setItem('token',JSON.stringify(response.data.token))
        localStorage.setItem('user',JSON.stringify(response.data.user))
        console.log(response);
        this.router.navigate(['/'])
      })
      .catch(error => {
        console.error(error.response.data.message);
      });
  }


}
