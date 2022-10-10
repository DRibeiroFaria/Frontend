import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AfterViewInit, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import {EditurlComponent} from '../editurl/editurl.component'
import { ShortneningComponent } from '../shortnening/shortnening.component';

@Component({
  selector: 'app-urltable',
  templateUrl: './urltable.component.html',
  styleUrls: ['./urltable.component.scss']
})

export class UrltableComponent implements OnInit {
  displayedColumns: string[] = ['url_code', 'long_url', 'count', 'created_at', 'action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient, private dialog : MatDialog,
    private notifyService : NotificationService) {
   }

  ngOnInit(): void {
    this.getAllUrl()
  }

  async getAllUrl(){
    return this.http.get<any>(environment.url+"api/url").subscribe({next:(res)=>{
    this.dataSource = new MatTableDataSource(res.url);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditRow(row : any) {
    this.dialog.open(EditurlComponent, {
      width: "50%",
      panelClass: 'my-dialog',
      data: row
    }).afterClosed().subscribe((res)=>{
      this.getAllUrl()
    });
  }

  deleteRow(row : any){
     return this.http.delete<any>(environment.url+`api/url/${row.id}`).subscribe({next:()=>{
      this.notifyService.showSuccess('','Success');
      this.getAllUrl()
     }
    })
  }

  openAddUrl(){
    this.dialog.open(ShortneningComponent, {
      width: "75%",
      panelClass: 'my-dialog',
    }).afterClosed().subscribe(()=>{
      this.getAllUrl()
    });
  }

  updateTable(){
    this.getAllUrl()
  }

  copy(url : string){
     navigator.clipboard.writeText(url)
     this.notifyService.showSuccess('','Copy to Clipboard');
    }

}
