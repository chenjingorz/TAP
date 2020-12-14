import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RestServiceService} from '../rest-service.service';
import {Employee} from '../employee';

@Component({
  selector: 'app-search-salary',
  templateUrl: './search-salary.component.html',
  styleUrls: ['./search-salary.component.css']
})
export class SearchSalaryComponent  {
  userData: Employee[];
  options: FormGroup;
  floatLabelControl = new FormControl();
  searchIsValid: boolean;
  orderParam: string;
  // input variables
  minSalary: number = null;
  maxSalary: number = null;
  sortBy = '';
  order: string;

  constructor(fb: FormBuilder,
              private snackBar: MatSnackBar,
              private RestService: RestServiceService) {
    this.options = fb.group({floatLabel: this.floatLabelControl});
  }

  searchResult(): void{
    this.validateSearch();
    this.userData = [];
    if (this.searchIsValid){
      this.RestService.getUsers(this.minSalary, this.maxSalary, this.orderParam)
        .subscribe(response => {
          console.log(response);
          if (response.length !== 0) {
            this.snackBar.open('data fetched', 'close');
            response.forEach( res => {
              console.log(res);
              delete res._id;
              this.userData.push(res);
            });
          } else {
            this.snackBar.open('no data fetched', 'close');
          }
      });
    } else {
      this.snackBar.open('invalid parameters', 'close');
    }
  }

  minChange(event): void{this.minSalary = event.target.value; }
  maxChange(event): void{this.maxSalary = event.target.value; }


  validateSearch(): void{
    if (Boolean(this.minSalary) && Boolean(this.maxSalary) && Boolean(this.sortBy)){
      if (this.minSalary < this.maxSalary){
        this.searchIsValid = true;
        console.log(this.order);
        if (this.order === 'ascending'){
          this.orderParam = '+' + this.sortBy;
        } else {
          this.orderParam = '-' + this.sortBy;
        }
      } else { this.searchIsValid = false; }
    } else { this.searchIsValid = false; }
  }
}
