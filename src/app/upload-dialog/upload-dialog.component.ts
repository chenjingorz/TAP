import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RestServiceService} from '../rest-service.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  csvFile: any;
  JSONData: any;

  constructor( public dialogRef: MatDialogRef<UploadDialogComponent>,
               private _snackBar: MatSnackBar,
               private RestService: RestServiceService) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  send(): void{
    console.log('send');
    // call the api to send the file. when the get the reply show toast
    this.RestService.uploadCSV(this.csvFile)
      .subscribe(response => {
      if (response === 200){
        this.openSnackBar('file uploaded success', 'close');
        this.closeModal();
      } else {
        this.openSnackBar('file uploaded failed', 'close');
      }
    });
  }


  openSnackBar(message: string, action: string): void{
    this._snackBar.open(message, action);
  }

  csvInputChange(fileInput: any): void{
    console.log(fileInput);
    if (fileInput.target.files) {
      this.fileAttr = fileInput.target.files[0].name;
      const file: File = fileInput.target.files[0];
      this.csvFile = file;
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}
