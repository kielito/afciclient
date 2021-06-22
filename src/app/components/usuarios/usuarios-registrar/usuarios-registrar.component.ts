import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';
	
@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit { //Clase

  user={  usuario:"", nombre:"", apellido:"", email:"", password:"",repassword:"", perfil:""};
  errorUsuario=0;
  errorNombre=0;
  errorApellido=0;
  errrorPassword=0;
  errorRePassrword=0;
  errorEmail=0;
  errorPerfil=0;

  constructor(private usuariosService: UsuariosService, private router:Router) { } //defino la variable usuariosService como un objeto UsuariosService segun se importo

  ngOnInit(): void { //Metodo: ngOnInit: representa el estado del objeto al momento de su creacion
    this.usuariosService.logued$.emit();
  }  

	registrar(){ //Metodo que se llama desde el formulario HTML
		console.log("Sign Up");
    console.log(this.user)
    
    this.usuariosService.registrar(this.user).subscribe(
      res => {        
        this.router.navigate(['usuarios/registrar']); //redireccion
        this.router.navigate(['usuarios/ingresar']); //redireccion
        let result: any=res;
        console.log(result.message);
      },
      err => {
        console.log(err.error.message);
      }
    )
	}

  verificarForm():boolean{
    this.errorUsuario=this.verificarUsuario(this.user.usuario);
    this.errorNombre=this.verificarNombre(this.user.nombre);
    this.errorApellido=this.verificarApellido(this.user.apellido);
    this.errrorPassword=this.verificarPassword(this.user.password);
    this.errorRePassrword=this.verificarRePassword(this.user.password, this.user.repassword);
    this.errorEmail=this.verificarEmail(this.user.email);
    this.errorPerfil=this.verificarRol(this.user.perfil);

    if(  (this.errorUsuario+this.errorNombre+this.errorApellido+this.errrorPassword+this.errorRePassrword+this.errorEmail+this.errorPerfil)>0){
      return false;
    }
    return true;
  }

  verificarUsuario(usuario:string):number {
    const patron=/^[a-zA-Z]{2,20}$/;
    if(usuario.length==0)
      return 1;
    if(usuario.length>20)
      return 2;
    if(!patron.test(usuario))
      return 3;
    return 0;
  }

  verificarNombre(nombre:string):number {
    const patron=/^[a-zA-Z]{2,20}$/;
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!patron.test(nombre))
      return 3;
    return 0;
  }

  verificarApellido(apellido:string):number {
    const patron=/^[a-zA-Z]{2,20}$/;
    if(apellido.length==0)
      return 1;
    if(apellido.length>20)
      return 2;
    if(!patron.test(apellido))
      return 3;
    return 0;
  }
  
  verificarPassword(password:any): number {
    const patron=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    if(!patron.test(password))
      return 3;
    return 0;
  }
  
  verificarRePassword(password:any, repassword:any): number {
    if(password!=repassword){
      return 1;
    }
    return 0;
  }
  
  verificarEmail(email:any): number {
    const patron=/^[a-z0-9\_]{1,30}@[a-z0-9]{1,10}\.[a-z]{2,3}/;
    if(email.length==0)
      return 1;
    if(email.length>50)
      return 2;
    if(!patron.test(email))
      return 3;
    return 0;
  }

  verificarRol(perfil:any): number {
    if(perfil!="Admin" && perfil!="Usuario"){
      return 1;
    }
    return 0;
  }

  limpiarUsuario() {
    if (this.errorUsuario > 0) {      
      this.user.usuario = "";
      this.errorUsuario = 0;
    }
  }

  limpiarNombre() {
    if (this.errorNombre > 0) {
      this.user.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarApellido() {
    if (this.errorApellido > 0) {
      this.user.apellido = "";
      this.errorApellido = 0;
    }
  }

  limpiarPassword() {
    if (this.errrorPassword > 0) {
      this.user.password = "";
      this.errrorPassword = 0;
    }
  }

  limpiarRePassword() {
    if (this.errorRePassrword > 0) {
      this.user.repassword = "";
      this.errorRePassrword = 0;
    }

  }

  limpiarEmail() {
    if(this.errorEmail>0){
      this.user.email = "";
      this.errorEmail = 0;
    }
  }
}


