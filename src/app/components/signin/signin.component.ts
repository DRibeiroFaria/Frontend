import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  
  signForm! : FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private authService : AuthService,
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      pass : ['', [Validators.required,Validators.minLength(8)]]
  })
  }

  signin(){
    this.authService.
    signin(this.signForm.value.email, this.signForm.value.pass)
    .subscribe()
    this.dialog.closeAll()
  }

}
