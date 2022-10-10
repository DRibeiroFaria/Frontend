import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./services/auth-guard.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ShortneningComponent } from './components/shortnening/shortnening.component';

const routes: Routes = [
  { path: "", component: ShortneningComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
