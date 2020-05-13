import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarComponent } from './components/car/car.component';
import { CarsComponent } from './components/cars/cars.component';


const routes: Routes = [
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'car/:id',
    component: CarComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '',
    redirectTo: '/cars',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
