import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router,private toastr: ToastrService) {}

  onLogin(): void {
    const url ='http://localhost:3000/api/user/login';
    const { email, password } = this.loginObj;

    axios.post(url, { email, password })
      .then(response => {
        localStorage.setItem('token',JSON.stringify(response.data.token))
        localStorage.setItem('user',JSON.stringify(response.data.user))
        this.toastr.success("Loged in successfully");
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.toastr.error(error.response.data.message);
      });
  }


}
