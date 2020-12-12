import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import {FileUploadModule} from 'primeng/fileupload';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { RestServiceService } from './rest-service.service';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { SearchSalaryComponent } from './search-salary/search-salary.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    UploadButtonComponent,
    UploadDialogComponent,
    SideBarComponent,
    EmployeeDashboardComponent,
    SearchSalaryComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [RestServiceService],
  entryComponents: [UploadDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
