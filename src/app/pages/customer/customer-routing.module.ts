import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { BonusComponent } from './bonus/bonus.component';
import { BirthdayComponent } from './birthday/birthday.component';

const routes: Routes = [
  {
    path: "bonus",
    component: BonusComponent
  },
  {
    path: "birthday",
    component: BirthdayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
