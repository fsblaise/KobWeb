import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginphonenumberComponent} from "./loginphonenumber.component";

const routes: Routes = [{ path: '', component: LoginphonenumberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginphonenumberRoutingModule { }
