export interface IUsuariosSenha {
  CodPessoaUsuario: number;
  Senha: string;
}
export class UsuariosSenha implements IUsuariosSenha {
  public CodPessoaUsuario: number;
  public Senha: string;

  constructor(
    public codpu: number = 0,
    public senha: string = '',
  ) {
    this.CodPessoaUsuario = codpu;
    this.Senha = senha;
  }
}
