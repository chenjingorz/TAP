import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data', Accept: 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RestServiceService {
  options: any;
  baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  uploadCSV(file): Observable<any>{
    const uploadedFile = new FormData();
    uploadedFile.append('file', file);
    const options = { content: uploadedFile };
    const url = this.baseUrl + 'users/upload';
    return this.http.post<void>(url, options);
    // return of('200');
  }
  getUsers(minSalary: number, maxSalary: number, sortBy: string): Observable<any> {
    console.log(sortBy);
    const url = this.baseUrl + `users?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=0&limit=30&sort=${sortBy}`;
    // return of(require('./mockUserData.json'));
    return this.http.get<Employee[]>(url);
  }
}
