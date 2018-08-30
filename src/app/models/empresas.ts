export interface IEmpresas {
  CodEmpresa?: number;
  NomeFantasia?: string;
  CNPJ?: string;
}
export class Empresas implements IEmpresas {
  public CodEmpresa: number;
  public NomeFantasia: string;
  public CNPJ: string;

  constructor(
    public cod: number = 0,
    public name: string = '',
    public cnpj: string = ''
  ) {
    this.CodEmpresa = cod;
    this.NomeFantasia = name;
    this.CNPJ = cnpj;
  }
}
