import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'/login'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HeaderComponent},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,HeaderComponent,OrdersComponent];
