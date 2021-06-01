import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user :  new FormControl ('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor( private api:ApiService, private router:Router) { }

  errorStatus:boolean = false;
  errorMsg:any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem("token")){
      this.router.navigate(["file-upload"]);
    }
  }

  onLogin(form: LoginI){
    //console.log(form);
    this.api.login(form).subscribe(data => {
      let response:ResponseI = data;

      if(response.status == "OK"){
        localStorage.setItem("token",response.result.token);
        this.router.navigate(["file-upload"]);
      }else{
        this.errorStatus = true;
        this.errorMsg = response.result;
      }
    });
  }
}
