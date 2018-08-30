import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// SERVICES
import { EmpresasService } from '../../services/empresas.service';
import { EmpresasTrafegusDeParaService } from '../../services/empresatrafegusdepara.service';

// MODELS
import { TypeMessage, Messages, Title } from '../../models/toaster.messages';
import { IEmpresas, Empresas } from '../../models/empresas';
import { ICentroCusto } from '../../models/centrocusto';
import { IEmpresaTrafegusDePara, EmpresaTrafegusDePara } from '../../models/empresastrafegusdepara';
import { IEmpresaTrafegus } from '../../models/empresastrafegus';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit {
  @ViewChild('toasterComponent') toaster;
  
  private trafegus: IEmpresaTrafegusDePara[];  
  private filtereds: Observable<IEmpresas[]>;
  private ListTrafegus: IEmpresaTrafegus;
  private frm: FormGroup;
  private tempEntities: any[];
  private searchCentroCusto: any[] = [];
  private viewEdit: boolean = false;
  private viewNewItem: boolean = false;
  private ativo: boolean = false;
  private roteirizar: boolean = false;
  private indexCC: number;
  private numberEntitieID: string;
  private totalIndex: number;
  private CodEmpresaTrafegus: string;

  _centrocusto: Array<ICentroCusto>;
  get centrocusto(): Array<ICentroCusto> {
    return this._centrocusto;
  }

  set centrocusto(value: Array<ICentroCusto>) {
    this._centrocusto = value;
  }

  constructor(
    private serviceEmpresa: EmpresasService,
    private serviceEmpresaDePara: EmpresasTrafegusDeParaService,
    private formGroup: FormBuilder,
    private route: Router
  ) {
    this.frm = formGroup.group({
      'entitie': []
    });
  }

  public ngOnInit() {
  }

  private filterID(number: string) {
    this.filtereds = null;
    this.numberEntitieID = number;

    this.tempEntities.forEach(c => {
      if (c.CodEmpresa.toString() == number) {
        this.centrocusto = c.LstCentroCusto;
      }
    });

    this.serviceEmpresaDePara.getEmpresasTrafegusDePara(number).subscribe(data => {
      if (data.Ativo === true) this.ativo = true;
      if (data.Roteirizar === true) this.roteirizar = true;

      this.trafegus = data.LstEstacaoDePara;
      this.ListTrafegus = data;
      this.CodEmpresaTrafegus = data.CodEmpresaTrafegus;
      
      this.trafegus.forEach(e => {
        if (e.CodCentroCusto) {
          this.centrocusto.forEach(c => {
            if (c.CodEmpresaCentroCusto == e.CodCentroCusto)
              this.filterCC(c.CodEmpresaCentroCusto.toString(), c.Nome);
          });
        }
      });
    }, error => {
      this.toaster.updateToaster(TypeMessage.error, Title.InvalidConfiguration, Messages.InvalidConfiguration);
    });
  }

  private loadEmpresa(nameEmpresa: string) {
    this.serviceEmpresa.getEmpresas(nameEmpresa).subscribe(data => {
      this.searchCentroCusto = [];
      this.filtereds = this.tempEntities = data;
    }, error => {
      if (error && error.Message === 'Authorization has been denied for this request.') {
        this.serviceEmpresa.ReToken().subscribe(c => {
          this.filtereds = null;
          this.loadEmpresa(nameEmpresa);
        });     
      } else
        this.toaster.updateToaster(TypeMessage.error, Title.InvalidEntitie, Messages.InvalidEntitie);
    });
  }

  private onChangeEntities(event) {
    if (event.key === 'Enter') {
      this.filtereds = null;
      this.filtereds = null;
      this.viewEdit = false;
      this.loadEmpresa(this.frm.get('entitie').value);
    }
  }

  private onChangeCC(event, index) {
    if (event.key === 'Enter') {
      this.indexCC = index;
      let centrocusto = (document.getElementById('centrocusto' + this.indexCC) as HTMLInputElement).value;

      this.centrocusto.forEach(c => {
        if (c.Nome.includes(centrocusto))
          this.searchCentroCusto.push(c);
      });      
    }
  }

  private edit() {
    this.viewEdit = true;
  }

  private deleteAll(id: string) {
    this.serviceEmpresaDePara.deleteEmpresasTrafegusDePara(id).subscribe(data => {
      this.toaster.updateToaster(TypeMessage.success, Title.DeleteSuccess, Messages.DeleteSuccess);
      this.Clear();
      this.filterID(this.numberEntitieID);
    }, error => {
      this.toaster.updateToaster(TypeMessage.error, Title.InvalidDelete, Messages.InvalidDelete);
    });
  }

  private delete(id: string) {
    let filter = this.trafegus.find(c => c.CodTrafegusEstacaoDePara.toString() == id);
    this.trafegus.splice(this.trafegus.indexOf(filter), 1);
  }

  private addItem() {
    this.viewEdit = true;

    if (!this.trafegus || this.trafegus.length === 0) {
      this.viewNewItem = true;
      this.trafegus = [];
    }
    
    this.trafegus.push(new EmpresaTrafegusDePara(0, 0, 0, 0, true, null, null, null, null));
  }

  private filterCC(cod: string, name: string) {
    (document.getElementById('centrocusto' + this.indexCC) as HTMLInputElement).value = cod;
    (document.getElementById('centrocustoName' + this.indexCC) as HTMLElement).innerHTML = name;

    this.searchCentroCusto = [];
  }

  private saveItem() {
    document.getElementById('errorsMessage').innerHTML = '';

    let count = 0;

    this.trafegus.forEach(e => {
      this.totalIndex = count++;
    });

    let filter = this.trafegus;

    this.trafegus = [];
    
    for (let x = 0; x <= this.totalIndex; x++) {
      let codEstacaodePara = parseInt((document.getElementById('codEstacaodePara' + x) as HTMLElement).innerHTML);
      let centrocusto = parseInt((document.getElementById('centrocusto' + x) as HTMLInputElement).value);
      let embarcador = (document.getElementById('embarcador' + x) as HTMLInputElement).checked;
      let posicao = parseInt((document.getElementById('posicao' + x) as HTMLInputElement).value);
      let estacao = parseInt((document.getElementById('estacao' + x) as HTMLInputElement).value);
      let pgr = parseInt((document.getElementById('pgr' + x) as HTMLInputElement).value);
      
      if (isNaN(centrocusto)) centrocusto = null;

      let codEmbarcador = 0;
      let codTrafegus = 0;
      let codTransportador = 0;

      let hasCode = filter.map(c => c).filter(c => c.CodTrafegusEstacaoDePara === codEstacaodePara);
      if (hasCode !== null) {
        codEmbarcador = hasCode[0].CodEmbarcador;
        codTrafegus = hasCode[0].CodEmpresaTrafegus;
        codTransportador = hasCode[0].CodTransportador;
      }

      let reg: IEmpresaTrafegusDePara = new EmpresaTrafegusDePara(codEstacaodePara, codTrafegus, codEmbarcador, codTransportador, embarcador, estacao, posicao, centrocusto, pgr);

      this.trafegus.push(reg);
    }
    
    this.ListTrafegus.LstEstacaoDePara = this.trafegus;
    this.ListTrafegus.Ativo = (document.getElementById('ativo') as HTMLInputElement).checked;
    this.ListTrafegus.Roteirizar = (document.getElementById('roteirizar') as HTMLInputElement).checked;
    this.ListTrafegus.CodEmpresa = parseInt(this.numberEntitieID);

    if (this.viewNewItem) {
      this.serviceEmpresaDePara.addEmpresasTrafegusDePara(this.ListTrafegus).subscribe(data => {
        if (data.Success) {
          this.Clear();
          this.toaster.updateToaster(TypeMessage.success, Title.InsertSuccess, Messages.InsertSuccess);
          this.filterID(this.numberEntitieID);
        } else {
          data.Notifications.forEach(e => {
            document.getElementById('errorsMessage').innerHTML = "ERRO: " + e.Message;
          }); 
        }
      }, error => {
        if (error && error.Message === 'Authorization has been denied for this request.') {
          this.serviceEmpresa.ReToken().subscribe(c => {
            this.filtereds = null;
            this.saveItem();
          });
        } else this.toaster.updateToaster(TypeMessage.error, Title.InvalidSuccess, Messages.InvalidSuccess);
      });
    } else {
      this.serviceEmpresaDePara.updateEmpresasTrafegusDePara(this.ListTrafegus).subscribe(data => {
        if (data.Success) {
          this.Clear();
          this.toaster.updateToaster(TypeMessage.success, Title.UpdateSuccess, Messages.UpdateSuccess);
          this.filterID(this.numberEntitieID);
        } else {
          data.Notifications.forEach(e => {
            document.getElementById('errorsMessage').innerHTML = "ERRO: " + e.Message;
          });
        }
      }, error => {
        if (error && error.Message === 'Authorization has been denied for this request.') {
          this.serviceEmpresa.ReToken().subscribe(c => {
            this.filtereds = null;
            this.saveItem();
          });
        } else this.toaster.updateToaster(TypeMessage.error, Title.InvalidUpdate, Messages.InvalidUpdate);
      });
    }
  }

  private Clear() {
    this.ListTrafegus = this.filtereds = null;
    this.trafegus = this.tempEntities = this.searchCentroCusto = [];
    this.viewNewItem = this.viewEdit = false;   
    this.indexCC = this.totalIndex = 0;
  }
}
