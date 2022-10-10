import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-editurl',
  templateUrl: './editurl.component.html',
  styleUrls: ['./editurl.component.scss']
})
export class EditurlComponent implements OnInit {

  urlForm!: FormGroup;

  constructor(private dialog : MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private api : ApiService, 
    private notifyService: NotificationService
    ) { }

  ngOnInit(): void {
  
    this.urlForm = this.formBuilder.group({
      url_code : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
    })

    this.urlForm.controls['url_code'].setValue(this.editData.url_code);

  }

  editUrl(): void {
    if(this.editData.url_code !== this.urlForm.value.url_code ){
      this.api.putUrl(this.editData.id, this.urlForm.value.url_code).subscribe()
      this.dialog.closeAll()
    }else{
       this.notifyService.showError("","Equal Code")
    }

  }

}
