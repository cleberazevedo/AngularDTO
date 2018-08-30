export interface ITrafegusQueue {
  PageIndex?: number;
  PageSize?: number;
  CreatedOn?: string;
  CodEmpresa?: number;
  Status?: boolean;
  CodSM?: number;
}
export class TrafegusQueue implements ITrafegusQueue {
  public PageIndex: number;
  public PageSize: number;
  public CreatedOn: string;
  public CodEmpresa: number;
  public Status: boolean;
  public CodSM: number;

  constructor(
    public pi: number = 0,
    public ps: number = 0,
    public c: string = '',
    public cod: number,
    public s: boolean,
    public sm: number
  ) {
    this.PageIndex = pi;
    this.PageSize = ps;
    this.CreatedOn = c;
    this.CodEmpresa = cod;
    this.Status = s;
    this.CodSM = sm;
  }
}



