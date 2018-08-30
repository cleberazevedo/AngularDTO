import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TrafegusEndpointsService {
  private API_ENDPOINT = environment.production ? 'http://192.168.7.38:3032/' :  'http://cmp-br-des019:3032/';

  constructor() { }

  // ENDPOINTS
  public ApiUsuarios: string = this.API_ENDPOINT + 'api/token';
  public ApiEmpresaByName: string = this.API_ENDPOINT + 'api/empresa/ListEmpresaByName';
  public ListConfigurations: string = this.API_ENDPOINT + 'api/configuracaotrafegus/List/';
  public UpdateConfigurations: string = this.API_ENDPOINT + 'api/configuracaotrafegus/update/';
  public AddConfigurations: string = this.API_ENDPOINT + 'api/configuracaotrafegus/Add/';
  public DeleteConfigurations: string = this.API_ENDPOINT + 'api/configuracaotrafegus/delete/';
  public ListTrafegusQueue: string = this.API_ENDPOINT + 'api/trafegusqueue/ListQueue';
  public ReQueue: string = this.API_ENDPOINT + 'api/trafegusqueue/ReQueue/';
  public DownloadLog: string = this.API_ENDPOINT + 'api/trafegusqueue/download/log/'; 
  public getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'bearer ' + localStorage.getItem('keyPassControl'));

    return headers;
  }
}

