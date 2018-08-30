export class MsgToaster {
  public type: TypeMessage;
  public msg: Messages;
  public title: Title;
}
export enum TypeMessage {
  error = 'error',
  success = 'success',
  warning = 'warning',
  required = 'error'
}
export enum Messages {
  InvalidUser = 'seu usuário ou senha parecem estar incorretos.',
  InvalidEntitie = 'empresa não encontrada.',
  InvalidConfiguration = 'Não existe configuração',
  InvalidUpdate = 'Ocorreu um erro ao atualizar',
  InvalidSuccess = 'Ocorreu um erro ao inserir',
  UpdateSuccess = 'Atualizado com sucesso',
  InsertSuccess = 'Inserido com sucesso',
  DeleteSuccess = 'Excluído com sucesso',
  InvalidDelete = 'ocorreu um erro ao excluir',
  RequiredField= 'O Campo é obrigatório '
}
export enum Title {
  InvalidUser = 'Ops, ocorreu um problema',
  InvalidEntitie = 'Empresas',
  InvalidConfiguration = 'Configurações',
  InvalidUpdate = 'Erro ao atualizar',
  InvalidSuccess = 'Inserir',
  UpdateSuccess = 'Atualização',
  InsertSuccess = 'Inserido',
  DeleteSuccess = 'Excluído',
  InvalidDelete = 'Erro ao excluir',
  RequiredField= 'Atenção' 
}

