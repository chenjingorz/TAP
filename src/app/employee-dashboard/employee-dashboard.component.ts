import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SearchSalaryComponent} from '../search-salary/search-salary.component';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'login', 'name', 'salary'];
  dataSource: any = [];
  employeeData: Employee[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(SearchSalaryComponent) searchSalary: SearchSalaryComponent;

  ngAfterViewInit(): void {
    // this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
    this.dataSource.paginator = this.paginator;
  }
  updateUserData(): void {
    setTimeout(
      () => {
        this.dataSource = this.searchSalary.userData;
        console.log(this.dataSource);
      }, 200 );
    this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
    this.dataSource.paginator = this.paginator;
  }
}
