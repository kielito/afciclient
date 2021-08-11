import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-abm',
  templateUrl: './usuarios-abm.component.html',
  styleUrls: ['./usuarios-abm.component.css']
})
export class UsuariosAbmComponent implements OnInit {

  user={  dni_usuario:"", pwd_usuario:"", repassword:"", nombre_usuario:"", apellido_usuario:"", organismo:"", pcia_usuario:"", perfil_usuario:""};  
  usuarios:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  revelar:boolean= true; //para mostrar (true) u ocultar (false) en el formulario  
  errorDniUsuario=0;
  errorPwdUsuario=0;
  errorRePassrword=0;
  errorNombreUsuario=0;
  errorApellidoUsuario=0; 
  errorOrganismo=0;
  errorPciaUsuario=0;
  errorPerfilUsuario=0;
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
    this.confirmacion=false;
    this.error=false;
    this.usuariosService.registrar(this.user).subscribe(
      res => {     
        this.ngOnInit();    
        this.mensaje = "agregado";
        this.confirmacion=true;
        this.recargarForm();    
           
      },
      err => {
        this.error=true;
        this.mensaje = err.error.message;
      }      
    )  
    
  }

  editar(usuario:any){
    this.confirmacion=false;
    this.error=false;
    if(!this.verificarEdit(usuario))
    {
      this.error=true;
    } else {    
      
      this.usuariosService.actualizarUsuario(usuario.dni_usuario, usuario).subscribe(
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
    //this.ngOnInit();
  }




  eliminar(usuario:any){
    this.confirmacion=false;
    this.error=false;
    this.usuariosService.eliminarUsuario(usuario.dni_usuario).subscribe(
      res => {
        this.ngOnInit();
        this.mensaje = "eliminado";
        this.confirmacion=true;        
      },
      err => {
        this.error=true;
        this.mensaje = err.error.message;
      }
    )    
  }

  verificarForm():boolean{    
    this.errorDniUsuario=this.verificarDniUsuario(this.user.dni_usuario);
    this.errorPwdUsuario=this.verificarPwdUsuario(this.user.pwd_usuario);
    this.errorRePassrword=this.verificarRePassword(this.user.pwd_usuario, this.user.repassword);    
    this.errorNombreUsuario=this.verificarNombreUsuario(this.user.nombre_usuario);
    this.errorApellidoUsuario=this.verificarApellidoUsuario(this.user.apellido_usuario);    
    this.errorOrganismo=this.verificarOrganismo(this.user.organismo);
    this.errorPciaUsuario=this.verificarPciaUsuario(this.user.pcia_usuario);
    this.errorPerfilUsuario=this.verificarPerfilUsuario(this.user.perfil_usuario);
    if(  (this.errorDniUsuario+this.errorPwdUsuario+this.errorRePassrword+this.errorNombreUsuario+this.errorApellidoUsuario+this.errorOrganismo+this.errorPciaUsuario+this.errorPerfilUsuario)>0){
      return false;
    }
    return true;
  }

  verificarEdit(usuario:any):boolean{    
    this.errorDniUsuario=this.verificarDniUsuario(this.user.dni_usuario);     
    this.errorNombreUsuario=this.verificarNombreUsuario(this.user.nombre_usuario);
    this.errorApellidoUsuario=this.verificarApellidoUsuario(this.user.apellido_usuario);    
    this.errorOrganismo=this.verificarOrganismo(this.user.organismo);
    this.errorPciaUsuario=this.verificarPciaUsuario(this.user.pcia_usuario);
    this.errorPerfilUsuario=this.verificarPerfilUsuario(this.user.perfil_usuario);

    if(usuario.NPass)
    {
      this.errorPwdUsuario=this.verificarPwdUsuario(usuario.NPass);
      if(  (this.errorDniUsuario+this.errorPwdUsuario+this.errorNombreUsuario+this.errorApellidoUsuario+this.errorOrganismo+this.errorPciaUsuario+this.errorPerfilUsuario)>0){
        return false;
      }
      return true;
    } else {
      if( (this.errorDniUsuario+this.errorNombreUsuario+this.errorApellidoUsuario+this.errorOrganismo+this.errorPciaUsuario+this.errorPerfilUsuario)>0){
        return false;
      }
      return true;
    }
  }

  verificarDniUsuario(dni_usuario:string):number {
    const patron=/^([0-9])*$/;
    if(dni_usuario.length==0)
      return 1;
    if(dni_usuario.length>20)
      return 2;
    if(!patron.test(dni_usuario))
      return 3;
    return 0;
  }

  onBlurDniUsuario(event: any){    
    this.errorDniUsuario=this.verificarDniUsuario(event);  
  }
 
  verificarPwdUsuario(pwd_usuario:any): number {
    const patron=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
    if(pwd_usuario.length==0)
      return 1;
    if(pwd_usuario.length>20)
      return 2;
    if(!patron.test(pwd_usuario))
      return 3;
    return 0;
  }

  onBlurPwdUsuario(pwd_usuario: any){    
    this.errorPwdUsuario=this.verificarPwdUsuario(pwd_usuario);
  }
  
  verificarRePassword(pwd_usuario:any, repassword:any): number {
    if(pwd_usuario!=repassword){
      return 1;
    }
    return 0;
  }
  
  onBlurRePassword(pwd_usuario: any, repassword: any){    
    this.errorRePassrword=this.verificarRePassword(pwd_usuario, repassword);
  }
 
  verificarNombreUsuario(nombre_usuario:string):number {
    const patron=/^[a-zA-Z]{2,20}$/;
    if(nombre_usuario.length==0)
      return 1;
    if(nombre_usuario.length>20)
      return 2;
    if(!patron.test(nombre_usuario))
      return 3;
    return 0;
  }
  
  onBlurNombreUsuario(nombre_usuario: any){    
    this.errorNombreUsuario=this.verificarNombreUsuario(nombre_usuario);    
  }

  verificarApellidoUsuario(apellido_usuario:string):number {
    const patron=/^[a-zA-Z]{2,20}$/;
    if(apellido_usuario.length==0)
      return 1;
    if(apellido_usuario.length>20)
      return 2;
    if(!patron.test(apellido_usuario))
      return 3;
    return 0;
  }

  onBlurApellidoUsuario(apellido_usuario: any){    
    this.errorApellidoUsuario=this.verificarApellidoUsuario(apellido_usuario);
  }
 
  verificarOrganismo(organismo:any): number {
    const patron=/^[a-zA-Z]{2,20}$/;
    if(organismo.length==0)
      return 1;
    if(organismo.length>50)
      return 2;
    if(!patron.test(organismo))
      return 3;
    return 0;
  }

  onBlurOrganismo(organismo: any){    
    this.errorOrganismo=this.verificarOrganismo(organismo);
  }   

  verificarPciaUsuario(pcia_usuario:any): number {
    if(pcia_usuario!="Buenos Aires" && pcia_usuario!="Capital Federal" && pcia_usuario!="Catamarca" && pcia_usuario!="Chaco" && pcia_usuario!="Chubut" && pcia_usuario!="Cordoba" && pcia_usuario!="Corrientes" && pcia_usuario!="Entre Rios" && pcia_usuario!="Formosa" && pcia_usuario!="Jujuy" && pcia_usuario!="La Pampa" && pcia_usuario!="La Rioja" && pcia_usuario!="Mendoza" && pcia_usuario!="Misiones" && pcia_usuario!="Neuquen" && pcia_usuario!="Rio Negro" && pcia_usuario!="Salta" && pcia_usuario!="San Juan" && pcia_usuario!="San Luis" && pcia_usuario!="Santa Cruz" && pcia_usuario!="Santa Fe" && pcia_usuario!="Santiago del Estero" && pcia_usuario!="Tierra del Fuego" && pcia_usuario!="Tucuman"){
      return 1;
    }
    return 0;
  }

  onBlurPciaUsuario(pcia_usuario: any){    
    this.errorPciaUsuario=this.verificarPciaUsuario(pcia_usuario);
  }

  verificarPerfilUsuario(perfil_usuario:any): number {
    if(perfil_usuario!="Admin" && perfil_usuario!="Usuario"){
      return 1;
    }
    return 0;
  }

  onBlurPerfilUsuario(perfil_usuario: any){    
    this.errorPerfilUsuario=this.verificarPerfilUsuario(perfil_usuario);
  }

  /*
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

  onBlurEmail(email: any){    
    this.errorEmail=this.verificarEmail(email);
  }
  */

  limpiarDatos(){
    this.limpiarDniUsuario();
    this.limpiarPwdUsuario();
    this.limpiarRePassword();
    this.limpiarNombreUsuario();
    this.limpiarApellidoUsuario();
    this.limpiarOrganismo();
  }

  limpiarDniUsuario() {    
    this.user.dni_usuario = "";
    this.errorDniUsuario = 0;    
  }

  limpiarPwdUsuario() {
    if (this.errorPwdUsuario > 0) {
      this.user.pwd_usuario = "";
      this.errorPwdUsuario = 0;
    }
  }

  limpiarRePassword() {
    if (this.errorRePassrword > 0) {
      this.user.repassword = "";
      this.errorRePassrword = 0;
    }
  }

  limpiarNombreUsuario() {
    if (this.errorNombreUsuario > 0) {
      this.user.nombre_usuario = "";
      this.errorNombreUsuario = 0;
    }
  }

  limpiarApellidoUsuario() {
    if (this.errorApellidoUsuario > 0) {
      this.user.apellido_usuario = "";
      this.errorApellidoUsuario = 0;
    }
  }  

  limpiarOrganismo() {
    if(this.errorOrganismo>0){
      this.user.organismo = "";
      this.errorOrganismo = 0;
    }
  }

  recargarForm(){    
    this.user.dni_usuario="";
    this.user.pwd_usuario="";
    this.user.repassword="";
    this.user.nombre_usuario="";
    this.user.apellido_usuario="";    
    this.user.organismo="";
	  this.mensaje="";
  }

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
