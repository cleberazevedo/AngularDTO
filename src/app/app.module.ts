import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCardModule, MatMenuModule, MatAutocompleteModule, MatRadioModule,
  MatDatepickerModule, MatNativeDateModule
} from '@angular/material'; 

import { ToasterModule } from 'angular2-toaster';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/shared/home/app.component';

import 'hammerjs';

import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { LoginComponent } from './components/shared/login/login.component';
import { PageNotFoundComponent } from './components/shared/notfound/notfound.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ToasterComponent } from './components/shared/toaster/toaster.component';
import { SelectComponent } from './components/shared/select/select.component';
import { QueueComponent } from './components/queue/queue.component';

import { TrafegusEndpointsService } from './services/endpoints.service';
import { EmpresasService } from './services/empresas.service';
import { EmpresasTrafegusDeParaService } from './services/empresatrafegusdepara.service';
import { UsuariosService } from './services/usuarios.service';
import { AuthGuard } from './services/loginguard';
import { TrafegusQueueService } from './services/trafegusqueue.service';

import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    DashboardComponent,
    LoginComponent,
    PageNotFoundComponent,
    EmpresaComponent,
    QueueComponent,
    ToasterComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToasterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    TrafegusEndpointsService,
    EmpresasService,
    UsuariosService,
    EmpresasTrafegusDeParaService,
    TrafegusQueueService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}

