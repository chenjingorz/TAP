import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data', Accept: 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})

export class RestServiceService {
  options: any;
  baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  uploadCSV(file): Observable<any>{
    const endpoint = this.baseUrl + 'users/upload';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(endpoint, formData);
  }
  getUsers(minSalary: number, maxSalary: number, sortBy: string): Observable<any> {
    console.log(sortBy);
    const url = this.baseUrl + `users?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=0&limit=30&sort=${sortBy}`;
    // return of(require('./mockUserData.json'));
    return this.http.get<any>(url);
  }
}
