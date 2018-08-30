import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// MODELS
import { IEmpresaTrafegusDePara } from '../models/empresastrafegusdepara';
import { IEmpresaTrafegus } from '../models/empresastrafegus';

// SERVICES
import { TrafegusEndpointsService } from './endpoints.service';

@Injectable()
export class EmpresasTrafegusDeParaService {
  constructor(private http: Http, private _endpoint: TrafegusEndpointsService) { }

  public getEmpresasTrafegusDePara(code: string): Observable<any> {
    return this.http.get(this._endpoint.ListConfigurations.toString() + code, { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }

  public updateEmpresasTrafegusDePara(empresatrafegus: IEmpresaTrafegus): Observable<any> {
    return this.http.post(this._endpoint.UpdateConfigurations.toString(), empresatrafegus, { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }

  public addEmpresasTrafegusDePara(empresatrafegus: IEmpresaTrafegus): Observable<any> {
    return this.http.post(this._endpoint.AddConfigurations.toString(), empresatrafegus, { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }

  public deleteEmpresasTrafegusDePara(code: string): Observable<any> {
    return this.http.delete(this._endpoint.DeleteConfigurations.toString() + code, { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }
}
