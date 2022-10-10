import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NotificationService } from 'src/app/services/notification.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shortnening',
  templateUrl: './shortnening.component.html',
  styleUrls: ['./shortnening.component.scss']
})
export class ShortneningComponent implements OnInit {
 
  urlForm! : FormGroup;
  label! : string; 

  constructor(private formBuild : FormBuilder, 
    private api: ApiService, 
    private notifyService : NotificationService) { }

  ngOnInit(): void {
     this.urlForm = this.formBuild.group({
      long_url : ['', [Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]]
    })
  }

  addUrl(){
    if(this.urlForm.valid){
      this.api.postUrl(this.urlForm.value)
      .subscribe({
        next:(res)=>{
          this.label = res.short_url;
          this.notifyService.showSuccess('','Success');
        },
        error:(error)=>{
          this.notifyService.showError(error.error.message.name,error.error.error);
        }
      })
    }
  }

  copy(short_url : string){
     navigator.clipboard.writeText(short_url)
     this.notifyService.showSuccess('','Copy to Clipboard');
    }
}
