export interface IUsuarios {
  CodPessoa?: number;
  Login?: string;
  Ativo?: boolean;
}
export class Usuarios implements IUsuarios {
  public CodPessoa: number;
  public Login: string;
  public Ativo: boolean;

  constructor(
    public codp: number = 0,
    public login: string = '',
    public ativo: boolean = false
  ) {
    this.CodPessoa = codp;
    this.Login = login;
    this.Ativo = ativo;
  }
}
