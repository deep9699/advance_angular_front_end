import { EmployeeService } from '../employee.service';
import { AbstractControl } from '@angular/forms';
import { employee_class } from '../employee_class';
import { map } from "rxjs/operators";

export class EmailCheck
{
  static checkEmail(x:EmployeeService)
  {
    return (c:AbstractControl)=>{

      return x.getEmployeeById(c.value).pipe(
        map((res:employee_class[])=>{
          if(res.length==0)
          {
            return null;
          }
          else
          {
            return {['invalidEmail']:true};
          }
        })
      );
    }
  }
}
