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
      if (response === '200'){
        this.openSnackBar('file uploaded success', 'close');
        this.closeModal();
      } else {
        this.openSnackBar('file uploaded failed', 'close');
      }});
  }


  openSnackBar(message: string, action: string): void{
    this._snackBar.open(message, action);
  }

  csvInputChange(fileInput: any): void{
    // console.log(fileInput.target.files[0]);
    this.csvFile = fileInput.target.files[0];
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileAttr = '';
      // for multiple files selected
      Array.from(fileInput.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]);

    } else {
      this.fileAttr = 'Choose File';
    }
  }
}
