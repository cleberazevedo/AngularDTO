import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVICES
import { TrafegusEndpointsService } from './endpoints.service';

@Injectable()
export class UsuariosService {
  constructor(private http: Http, private _endpoint: TrafegusEndpointsService) { }

  public getUsuario(usuario: string, password: string): Observable<any> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let params = new URLSearchParams();

    params.append('grant_type', 'password');
    params.append('userName', usuario);
    params.append('password', password);

    let body = params.toString();
    
    return this.http.post(this._endpoint.ApiUsuarios.toString(), body, { headers: headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }
}
