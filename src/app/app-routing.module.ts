import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivateChild, CanActivate } from '@angular/router';

import { AuthGuard } from './services/loginguard';

import { PageNotFoundComponent } from './components/shared/notfound/notfound.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { LoginComponent } from './components/shared/login/login.component';
import { QueueComponent } from './components/queue/queue.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'empresa', component: EmpresaComponent, canActivate: [AuthGuard],
        data: {
          breadcrumb: "Empresa"
        }
      },
      {
        path: 'queue', component: QueueComponent, canActivate: [AuthGuard],
        data: {
          breadcrumb: "Fila"
        }
      }  
    ]
  },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

