import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  employeeObj: EmployeeObj;
  sortBy: string;
  searchText: string;
  employeeArr: EmployeeObj[] = [];

  constructor(private alertService: ToastrService) {
    this.employeeObj = new EmployeeObj();
    this.searchText = '';
    this.sortBy = '';
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  showToasterSuccess() {
    this.alertService.success('Success', 'Employee Added Successfully');
  }

  onSave() {
    this.employeeArr.push(this.employeeObj);
    const isData = localStorage.getItem('EmpData');
    if (isData == null) {
      const newArr = [];
      newArr.push(this.employeeObj);
      this.employeeObj.EmployeeId = 0;
      localStorage.setItem('EmpData', JSON.stringify(newArr));
    } else {
      const oldData = JSON.parse(isData);
      const newId = oldData.length + 1;
      this.employeeObj.EmployeeId = newId;
      oldData.push(this.employeeObj);
      localStorage.setItem('EmpData', JSON.stringify(oldData));
    }
    this.employeeObj = new EmployeeObj();
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeArr.push(this.employeeObj);
    const isData = localStorage.getItem('EmpData');
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.employeeArr = localData;
    }
  }

  onEdit(item: EmployeeObj) {
    this.employeeObj = item;
  }

  onDelete(item: EmployeeObj) {
    const isData = localStorage.getItem('EmpData');
    if (isData != null) {
      const localData = JSON.parse(isData);
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].EmployeeId == item.EmployeeId) {
          localData.splice(0, 1);
        }
      }
      localStorage.setItem('EmpData', JSON.stringify(localData));
      this.getAllEmployee();
    }
  }

  onCancel() {}

  onSearch() {
    const isData = localStorage.getItem('EmpData');
    if (isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == 'Name') {
        const filteredData = localData.filter((m: EmployeeObj) =>
          m.FirstName.toLocaleLowerCase().startsWith(
            this.searchText.toLocaleLowerCase()
          )
        );
        this.employeeArr = filteredData;
      }
      if (this.sortBy == 'Company') {
        const filteredData = localData.filter((m: EmployeeObj) =>
          m.Company.toLocaleLowerCase().startsWith(
            this.searchText.toLocaleLowerCase()
          )
        );
        this.employeeArr = filteredData;
      }
    }
  }
}

export class EmployeeObj {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  EmailId: string;
  Designation: string;
  Framework: string;
  Company: string;
  constructor() {
    this.EmployeeId = 0;
    this.FirstName = '';
    this.LastName = '';
    this.EmailId = '';
    this.Designation = '';
    this.Framework = '';
    this.Company = '';
  }
}
