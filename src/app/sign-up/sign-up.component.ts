import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EmailCheck } from '../validators/emailCheck';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  addEmp:FormGroup;
  InvalidName:string[]=["abc","xyz","mno"];
  password:string;
  constructor(private emp_ser:EmployeeService,private _router:Router) { }

  ngOnInit() {

    this.addEmp=new FormGroup({
      emp_email:new FormControl(null,[Validators.email],EmailCheck.checkEmail(this.emp_ser)),
      emp_name:new FormControl(null,[Validators.required,this.name_validator.bind(this)]),
      emp_phone:new FormControl(),
      cnfrmPassword:new FormGroup({
        emp_password:new FormControl(null,[Validators.required]),
        emp_confirm_password:new FormControl(null,[Validators.required]),
      },[this.confirm_password_validator.bind(this)]),
      emp_gender:new FormControl('Male'),
      emp_city:new FormControl('Ahemdabad'),
      emp_notification:new FormControl('mail')
    });

    this.addEmp.get('emp_notification').valueChanges.subscribe(
      (data)=>{
        console.log(data);
        this.notification_validator(data);
      }
    );

  }


  notification_validator(x:string)
  {
    if(x=='phone')
    {
      this.addEmp.get('emp_phone').setValidators(Validators.required);
      this.addEmp.get('emp_email').clearValidators();
    }
    else
    {
      this.addEmp.get('emp_phone').clearValidators();
      this.addEmp.get('emp_email').setValidators(Validators.required);
    }
    this.addEmp.updateValueAndValidity();
  }
  name_validator(x:AbstractControl)
  {
    if(this.InvalidName.indexOf(x.value)!=-1)
    {
      return {'invalidName':true};
    }
    return null;
  }


  confirm_password_validator(a:AbstractControl):{[y:string]:boolean}
  {
    const x1=a.get('emp_password').value;
    const x2=a.get('emp_confirm_password').value;
    if(x1===x2)
    {
      return null;
    }
    return {'diffrenetPassword':true};
  }

  onSignUp()
  {
    console.log(this.addEmp);
    this.emp_ser.insertCustomer(this.addEmp).subscribe(
      (data:any)=>
      {
        console.log(data);
      }
    );
  }

  onBack()
  {
    this._router.navigate(['']);
  }

}
