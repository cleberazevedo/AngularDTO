import { IEmpresaTrafegusDePara, EmpresaTrafegusDePara } from './empresastrafegusdepara';

export interface IEmpresaTrafegus {
  CodEmpresaTrafegus: number;
  CodEmpresa: number;
  Ativo: boolean;
  Roteirizar: boolean;
  LstEstacaoDePara: IEmpresaTrafegusDePara[];
}
export class EmpresaTrafegus implements IEmpresaTrafegus {
  public CodEmpresaTrafegus: number;
  public CodEmpresa: number;
  public Ativo: boolean;
  public Roteirizar: boolean;
  public LstEstacaoDePara: IEmpresaTrafegusDePara[];

  constructor(
    public cod: number = 0,
    public codempresa: number = 0,
    public a: boolean = false,
    public r: boolean = false,
    public ep = new Array<EmpresaTrafegusDePara>(new EmpresaTrafegusDePara(0, 0, 0, 0, false, 0, 0, 0, 0))
  ) {
    this.CodEmpresa = cod;
    this.CodEmpresa = codempresa;
    this.Ativo = a;
    this.Roteirizar = r;
    this.LstEstacaoDePara = ep;
  }
}
