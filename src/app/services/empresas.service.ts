import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IEmpresas } from '../models/empresas';

// SERVICES
import { TrafegusEndpointsService } from './endpoints.service';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class EmpresasService {
  _empresas: IEmpresas;
  get empresas(): IEmpresas {
    return this._empresas;
  }

  set empresas(value: IEmpresas) {
    this._empresas = value;
  }

  constructor(private http: Http, private _endpoint: TrafegusEndpointsService, private usuarioService: UsuariosService) { }

  public getEmpresas(name: string): Observable<any> {
    this._empresas = {
      NomeFantasia: name
    };
    
    return this.http.post(this._endpoint.ApiEmpresaByName.toString(), JSON.stringify(this._empresas), { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }

  public ReToken(): Observable<any>  {
    localStorage.setItem('keyPassControl', '');

    return this.usuarioService.getUsuario(localStorage.getItem('user'), localStorage.getItem('password')).map(res => {
      localStorage.setItem('keyPassControl', res.access_token);
    }, error => {
      console.log(error);
    });
  }
}
