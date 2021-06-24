import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {

  user={  Usuario:"", Email:"", Password:""}; //defino la variable
  reintentar:boolean=false;
  mensaje:string="";
  errorUsuario=0;
  errorEmail=0;
  errorPassword=0;
  error:boolean = false;
  
	constructor(private usuariosService: UsuariosService, private router:Router) { } //defino la variable usuariosService como un objeto UsuariosService segun se importo

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
  }

  ingresar(){ //Metodo que se llama desde el formulario HTML
		console.log("Sign In");
    console.log(this.user);
    
    this.usuariosService.ingresar(this.user).subscribe( //
      /*res => { //bloque de ejecucion cuando la conexion con el server es exitosa
        console.log(res);
      },
      err => console.log(err) //bloque de ejecucion cuando la conexion con el server arrojo error
      */
      res => {
        let result:any=res;     
        localStorage.setItem('token',result.token); //localStorage: variable conocida por Angular, paso atributo y su valor        
        localStorage.setItem('usuario',JSON.stringify(result.sesion));   
        this.usuariosService.logued$.emit();
        this.router.navigate(['usuarios/home']); //redireccion        
      },
      err => {        
        console.log(err.error.message);
        this.reintentar=true;
        this.error = true;
        this.mensaje=err.error.message;
      }
    )    
	}

  verificarForm():boolean{
    this.errorUsuario=this.verificarUsuario(this.user.Usuario);
    this.errorEmail=this.verificarEmail(this.user.Email);
    this.errorPassword=this.verificarPassword(this.user.Password);
    if((this.errorUsuario+this.errorEmail+this.errorPassword)>0){
      this.error = true;
      return false;
    }
    return true;
  }

  verificarUsuario(usuario:string):number {    
    if(usuario.length==0)
      return 1;
    return 0;
  }

  verificarEmail(email:string):number {    
    if(email.length==0)
      return 1;
    return 0;
  }
  
  verificarPassword(password:any): number {    
    if(password.length==0)
      return 1;
    return 0;
  }

  recargarForm(){
    this.reintentar=false;
    this.user.Usuario="";
    this.user.Email="";
    this.user.Password="";
	  this.mensaje="";
  }

}
