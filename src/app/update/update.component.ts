import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailCheck } from '../validators/emailCheck';
import { employee_class } from '../employee_class';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateEmp:FormGroup;
  Email:string;
  InvalidName:string[]=["abc","xyz","mno"];
  password:string;
  constructor(private emp_ser:EmployeeService,private _router:Router,private act_router:ActivatedRoute) { }

  ngOnInit() {
    this.Email=this.act_router.snapshot.params['email'];

    this.emp_ser.getEmployeeById(this.Email).subscribe(
      (data:employee_class[])=>
      {
        this.getAllDetails(data[0]);
      }
    );

    this.updateEmp=new FormGroup({
      emp_email:new FormControl(null,[Validators.email],EmailCheck.checkEmail(this.emp_ser)),
      emp_name:new FormControl(null,[Validators.required,this.name_validator.bind(this)]),
      emp_phone:new FormControl(),
      emp_gender:new FormControl(null),
      emp_city:new FormControl(null),
      emp_notification:new FormControl('mail')
    });

    this.updateEmp.get('emp_notification').valueChanges.subscribe(
      (data)=>{
        console.log(data);
        this.notification_validator(data);
      }
    );

  }


  getAllDetails(data:employee_class)
  {
    console.log(data);
    this.updateEmp.patchValue({
      emp_email:data.emp_email,
      emp_name:data.emp_name,
      emp_phone:data.emp_phone,
      emp_city:data.emp_city,
      emp_gender:data.emp_gender
    })

    console.log(this.updateEmp.value);
  }

  notification_validator(x:string)
  {
    if(x=='phone')
    {
      this.updateEmp.get('emp_phone').setValidators(Validators.required);
      this.updateEmp.get('emp_email').clearValidators();
    }
    else
    {
      this.updateEmp.get('emp_phone').clearValidators();
      this.updateEmp.get('emp_email').setValidators(Validators.required);
    }
    this.updateEmp.updateValueAndValidity();
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

  onUpdate()
  {
    console.log(this.updateEmp);
    this.emp_ser.updateCustomer(this.updateEmp).subscribe(
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
