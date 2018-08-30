import { Component, OnInit } from '@angular/core';

import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { MsgToaster, TypeMessage, Messages, Title } from '../../../models/toaster.messages';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html'
})
export class ToasterComponent implements OnInit {
  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  private toasterconfig: ToasterConfig = new ToasterConfig({ positionClass: 'toast-bottom-right', newestOnTop: false, timeout: 4000, animation: 'fade' });

  public updateToaster(type: TypeMessage, title: Title, message: Messages) {
    this.toasterService.pop(type, title, message);
  }

  public ngOnInit() {
  }
}
