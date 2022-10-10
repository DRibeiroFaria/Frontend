import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  
  signUpForm! : FormGroup;
  constructor(private formBuild : FormBuilder, 
    private authService : AuthService, 
    private notifyService : NotificationService,
    private dialogRef : MatDialogRef<SingupComponent>) { }

  ngOnInit(): void {
     this.signUpForm = this.formBuild.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email : ['', [Validators.required, Validators.email,  Validators.maxLength(100)]],
      pass : ['', [Validators.required, Validators.minLength(8)]]
  })
  }

   signUp(){
    this.authService.
    signup(this.signUpForm.value)
    .subscribe()
    this.dialogRef.close()
  }


}
  