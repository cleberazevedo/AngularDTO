import { Response } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DateAdapter } from '@angular/material';

// MODELS
import { ITrafegusQueue } from '../../models/trafegusqueue';
import { TypeMessage, Messages, Title } from '../../models/toaster.messages';

// SERVICES
import { EmpresasService } from '../../services/empresas.service';
import { TrafegusQueueService } from '../../services/trafegusqueue.service';

import 'rxjs/Rx';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html'
})
export class QueueComponent implements OnInit {
  @ViewChild('toasterComponent') toaster;

  private serializedDate = new FormControl((new Date()).toISOString());
  private frm: FormGroup;
  private filter = {
    date: '',
    status: true
  }

  private queue: ITrafegusQueue[];

  _setQueue: ITrafegusQueue;
  get setQueue(): ITrafegusQueue {
    return this._setQueue;
  }

  set setQueue(value: ITrafegusQueue) {
    this._setQueue = value;
  }

  constructor(
    private formGroup: FormBuilder,
    private route: Router,
    private dateAdapter: DateAdapter<Date>,
    private serviceQueue: TrafegusQueueService,
    private serviceEmpresa: EmpresasService
  ) {
    this.frm = formGroup.group({
      'createData': [],
      'codEmpresa': [],
      'codSM': [],
      'status': []
    });

    // set datepicker in portuguese
    this.dateAdapter.setLocale('pt-BR');

    moment.locale('pt-BR');

    this._setQueue= {
      PageIndex: 1,
      PageSize: 20,
      CodSM: 0,
      Status: false,
      CodEmpresa: 0,
      CreatedOn: moment(new Date()).format('DD/MM/YYYY')
    };
  }

  public ngOnInit() {
    this.filter.date = this._setQueue.CreatedOn;
    this.filter.status = true;
  }

  private pushList() {
    let CodEmpresa = this.frm.get('codEmpresa').value;
    let Status =  this.frm.get('status').value;
    let CodSM = this.frm.get('codSM').value;
    let _filter = this._setQueue;
    
    _filter.CodEmpresa = CodEmpresa;
    _filter.Status = Status;
    _filter.CodSM = CodSM;
    _filter.PageIndex = 1;
    _filter.PageSize = 20;
    
    this.setQueue = _filter;

    this.serviceQueue.listQueue(this.setQueue).subscribe(data => {
     
      if(data.length==0)
        this.toaster.updateToaster(TypeMessage.error, Title.InvalidConfiguration, Messages.InvalidConfiguration);
        this.queue = data;
    }, error => {
      if (error && error.Message === 'Authorization has been denied for this request.') {
        this.serviceEmpresa.ReToken().subscribe(c => {
          this.pushList();
        });
      } else this.toaster.updateToaster(TypeMessage.error, Title.InvalidConfiguration, Messages.InvalidConfiguration);
    });
  }

  private autoRenew(id: number) {
    this.serviceQueue.autoRenewSM(id).subscribe(data => {
      this.pushList();
      this.toaster.updateToaster(TypeMessage.success, Title.UpdateSuccess, Messages.UpdateSuccess);
    }, error => {
      if (error && error.Message === 'Authorization has been denied for this request.') {
        this.serviceEmpresa.ReToken().subscribe(c => {
          this.autoRenew(id);
        });
      } else this.toaster.updateToaster(TypeMessage.error, Title.InvalidConfiguration, Messages.InvalidConfiguration);
    });
  }


  private filedDownload(id: number) {
    this.serviceQueue.DownloadLogSM(id).subscribe(data => {
      console.log(data._body);

      let blob = new Blob([data._body], { type: 'text/xml' });
      saveAs(blob, id.toString() + '.xml');
      
      this.toaster.updateToaster(TypeMessage.success, Title.UpdateSuccess, Messages.UpdateSuccess);
    }, error => {
      if (error && error.Message === 'Authorization has been denied for this request.') {
        this.serviceEmpresa.ReToken().subscribe(c => {
          this.filedDownload(id);
        });
      } else {
        console.log(error);
        this.toaster.updateToaster(TypeMessage.error, Title.InvalidConfiguration, Messages.InvalidConfiguration);
      }
    });
  }

  private onDate(event): void {
    this._setQueue.CreatedOn = this.filter.date = moment(event).format('DD/MM/YYYY');
  }

  private changeStatus(event: boolean) {
    this._setQueue.Status = this.filter.status = event;
  }
}
