import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { employee_class } from './employee_class';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url:string='http://localhost:3000/employee/';
  constructor(private _http:HttpClient) { }

  getAllEmployee()
  {
    return this._http.get(this.url);
  }
  getEmployeeById(id:string)
  {
    return this._http.get(this.url+id);
  }

  insertCustomer(item:FormGroup)
  {
    let body=item.value;
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }
  updateCustomer(item:FormGroup)
  {
    let body=item.value;
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url,body,{headers:head1});
  }


}
