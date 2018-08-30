export interface ICentroCusto {
  CodEmpresaCentroCusto?: number;
  CodEmpresa?: number;
  Nome?: string;
  Ativo?: boolean
}
export class CentroCusto implements ICentroCusto {
  public CodEmpresaCentroCusto: number;
  public CodEmpresa: number;
  public Nome: string;
  public Ativo: boolean;

  constructor(
    public codcc: number = 0,
    public codempresa: number = 0,
    public nome: string = '',
    public ativo: boolean = false
  ) {
    this.CodEmpresaCentroCusto = codcc;
    this.CodEmpresa = codempresa;
    this.Nome = name;
    this.Ativo = ativo;
  }
}
