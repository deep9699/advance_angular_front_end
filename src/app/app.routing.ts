import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateComponent } from './update/update.component';

const arr:Routes=[
  {path:'',component:DisplayComponent},
  {path:'sign_up',component:SignUpComponent},
  {path:'update/:email',component:UpdateComponent}
];

export const routing=RouterModule.forRoot(arr);
