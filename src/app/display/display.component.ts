import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { employee_class } from '../employee_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  arr:employee_class[]=[];

  constructor(private emp_ser:EmployeeService,private _router:Router) { }

  ngOnInit() {
    this.emp_ser.getAllEmployee().subscribe(
      (data:employee_class[])=>
      {
        this.arr=data;
      }
    );
  }

  onAdd()
  {
    console.log("add");
    this._router.navigate(['sign_up']);
  }

  onUpdate(email_id:string)
  {
    console.log("update");
    this._router.navigate(['update',email_id]);
  }
}
