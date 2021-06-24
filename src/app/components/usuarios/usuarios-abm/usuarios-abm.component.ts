import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-abm',
  templateUrl: './usuarios-abm.component.html',
  styleUrls: ['./usuarios-abm.component.css']
})
export class UsuariosAbmComponent implements OnInit {

  user={  usuario:"", nombre:"", apellido:"", email:"", password:"",repassword:"", perfil:""};  
  usuarios:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  revelar:boolean= true; //para mostrar (true) u ocultar (false) en el formulario  
  errorUsuario=0;
  errorNombre=0;
  errorApellido=0;
  errrorPassword=0;
  errorRePassrword=0;
  errorEmail=0;
  errorPerfil=0;
  confirmacion:boolean = false;
  error:boolean = false;
  mensaje = "";

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.confirmacion=false;
    this.error=false;
    this.usuariosService.listarUsuarios().subscribe( //se utiliza subscribe ya que el metodo trabaja con la base de datos
			//res => console.log(res), //Parametro 1: si se ejecuto bien se informa
      res => { 
        this.usuarios = res;
      },
			err => console.log(err) //Parametro 2: si hubo un error lo informo
		) //los log se ven en la consola del navegador    
  }

  registrar(){		
    this.usuariosService.registrar(this.user).subscribe(
      res => {        
        this.mensaje = "agregado";
        this.confirmacion=true;
        this.recargarForm();
      },
      err => {
        this.error=true;
        this.mensaje = err.error.message;
      }
    )
    
    this.ngOnInit(); 
  }

  editar(usuario:any){
    this.confirmacion=false;
    this.error=false;
    if(!this.verificarEdit(usuario))
    {
      this.error=true;
    } else {    
      
      this.usuariosService.actualizarUsuario(usuario.Id, usuario).subscribe(
        res => {        
          this.ngOnInit();
          this.mensaje = "actualizado";
          this.confirmacion=true;
        },
        err => {
          this.error=true;
          this.mensaje = err.error.message;
        }
      )
    }
  }

  eliminar(usuario:any){
    this.confirmacion=false;
    this.error=false;
    this.usuariosService.eliminarUsuario(usuario.Id).subscribe(
      res => {
        this.mensaje = "eliminado";
        this.confirmacion=true;
      },
      err => {
        this.error=true;
        this.mensaje = err.error.message;
      }
    )
    this.ngOnInit();
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

  verificarEdit(usuario:any):boolean{    
    this.errorUsuario=this.verificarUsuario(usuario.Usuario);
    this.errorNombre=this.verificarNombre(usuario.Nombre);
    this.errorApellido=this.verificarApellido(usuario.Apellido);    
    this.errorEmail=this.verificarEmail(usuario.Email);
    this.errorPerfil=this.verificarRol(usuario.Perfil);

    if(usuario.NPass)
    {
      this.errrorPassword=this.verificarPassword(usuario.NPass);
      if(  (this.errorUsuario+this.errorNombre+this.errorApellido+this.errrorPassword+this.errorEmail+this.errorPerfil)>0){
        return false;
      }
      return true;
    } else {
      if( (this.errorUsuario+this.errorNombre+this.errorApellido+this.errorEmail+this.errorPerfil)>0){
        return false;
      }
      return true;
    }
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
    const patron=/^[a-z0-9\_\_.]{1,30}@[a-z0-9]{1,10}\.[a-z]{2,3}/;
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

  limpiarDatos(){
    this.limpiarUsuario();
    this.limpiarNombre();
    this.limpiarApellido();
    this.limpiarPassword();
    this.limpiarRePassword();
    this.limpiarEmail();
  }

  limpiarUsuario() {    
    this.user.usuario = "";
    this.errorUsuario = 0;    
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

  recargarForm(){    
    this.user.usuario="";
    this.user.nombre="";
    this.user.apellido="";
    this.user.password="";
    this.user.repassword="";
    this.user.email="";
	  this.mensaje="";
  }

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
