import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})

export class UploadButtonComponent implements OnInit {
  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  openUploadModal(): void{
    const dialogRef = this.dialog.open(UploadDialogComponent);
  }

}
