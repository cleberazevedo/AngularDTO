import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVICES
import { TrafegusEndpointsService } from './endpoints.service';

// MODELS
import { ITrafegusQueue } from '../models/trafegusqueue';

@Injectable()
export class TrafegusQueueService {
  constructor(private http: Http, private _endpoint: TrafegusEndpointsService) { }

  public listQueue(queue: ITrafegusQueue): Observable<any> {
    return this.http.post(this._endpoint.ListTrafegusQueue.toString(), queue, { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }
  
  public autoRenewSM(code: number): Observable<any> {
    return this.http.get(this._endpoint.ReQueue.toString() + code, { headers: this._endpoint.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }
  public DownloadLogSM(code: number): Observable<any> {
    return this.http.get(this._endpoint.DownloadLog.toString() + code, { headers: this._endpoint.getHeaders() })
      .map(res => res)
      .catch((error: any) => Observable.throw(error.json().error || error.json()));
  }
}

