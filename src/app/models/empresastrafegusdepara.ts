export interface IEmpresaTrafegusDePara {
  CodTrafegusEstacaoDePara: number;
  CodEmpresaTrafegus: number;
  CodEmbarcador: number;
  CodTransportador: number;
  Embarcador: boolean;
  Estacao: number;
  BR2Posicao: number;
  CodCentroCusto: number;
  PGR: number;
}
export class EmpresaTrafegusDePara implements IEmpresaTrafegusDePara {
  public CodTrafegusEstacaoDePara: number;
  public CodEmpresaTrafegus: number;
  public CodEmbarcador: number;
  public CodTransportador: number;
  public Embarcador: boolean;
  public Estacao: number;
  public BR2Posicao: number;
  public CodCentroCusto: number;
  public PGR: number;

  constructor(
    public codtrafestacao: number = 0,
    public codtrafegus: number = 0,
    public codembarcador: number = 0,
    public codtransportador: number = 0,
    public embarcador: boolean = false,
    public estacao: number = 0,
    public posicao: number = 0,
    public codcc: number = 0,
    public pgr: number = 0
  ) {
    this.CodTrafegusEstacaoDePara = codtrafestacao;
    this.CodEmpresaTrafegus = codtrafegus;
    this.CodEmbarcador = codembarcador;
    this.CodTransportador = codtransportador;
    this.Embarcador = embarcador;
    this.Estacao = estacao;
    this.BR2Posicao = posicao;
    this.CodCentroCusto = codcc;
    this.PGR = pgr;
  }
}
