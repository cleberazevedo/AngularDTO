import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

//SERVICES
import { UsuariosService } from '../../../services/usuarios.service';

//MODELS
import { IUsuarios } from '../../../models/usuarios';
import { IUsuariosSenha } from '../../../models/usuariossenha';
import { TypeMessage, Messages, Title } from '../../../models/toaster.messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private hide: boolean = true;
  private frm: FormGroup;

  _usuarios: IUsuarios;
  get usuarios(): IUsuarios {
    return this._usuarios;
  }
  
  set usuarios(value: IUsuarios) {
    this._usuarios = value;
  }

  _usuariosenha: IUsuariosSenha;
  get usuariosenha(): IUsuariosSenha {
    return this._usuariosenha;
  }

  set usuariosenha(value: IUsuariosSenha) {
    this._usuariosenha = value;
  }

  @ViewChild('toasterComponent') toaster;

  constructor(private formGroup: FormBuilder, private usuarioService: UsuariosService, private route: Router) {
    this.frm = formGroup.group({
      'user': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])]
    });
  }

  public ngOnInit() {
    this._usuarios = {
      CodPessoa: 0,
      Login: '',
      Ativo: false
    };

    this._usuariosenha = {
      CodPessoaUsuario: 0,
      Senha: ''
    }
  }

  private login() {
    let filter = this._usuarios;
    let filterPassword = this._usuariosenha;

    filter.Login = this.frm.get('user').value;
    filterPassword.Senha = this.frm.get('password').value;

    this.usuarios = filter;
    this.usuariosenha = filterPassword;

    this.usuarioService.getUsuario(this.usuarios.Login, this.usuariosenha.Senha).subscribe(res => {
      localStorage.setItem('user', this.usuarios.Login);
      localStorage.setItem('password', this.usuariosenha.Senha);
      localStorage.setItem('keyPassControl', res.access_token);
      this.route.navigate(['dashboard']);
    }, error => {
      this.toaster.updateToaster(TypeMessage.error, Title.InvalidUser, Messages.InvalidUser);
    });
  }
}
