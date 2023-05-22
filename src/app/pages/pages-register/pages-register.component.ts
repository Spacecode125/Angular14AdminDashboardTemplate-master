import { Component,  } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent  {
  RegisterObj: any = {
    email: '',
    firstName:'',
    lastName:'',
    role:'user' ||'salesman',
    phone:'',
    address:'',
    password:'',
  }



  constructor(private router: Router,private toastr: ToastrService) {}


  onRegister(): void {
    const url = 'http://localhost:3000/api/user/register';
    const { email, firstName, lastName, role ,phone, address,password } = this.RegisterObj;

    axios.post(url, { email, firstName , lastName ,role,phone, address, password ,})
      .then(response => {
        console.log(response);
        this.router.navigate(['/pages-login'])
        this.toastr.success("Acount successfully created");
      })
      .catch(error => {
        this.toastr.error(error.response.data.message);
      });
  }


  }


