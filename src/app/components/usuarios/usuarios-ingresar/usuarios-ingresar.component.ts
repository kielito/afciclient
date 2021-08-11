import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {

  user={  dni_usuario:"", pwd_usuario:""}; //defino la variable
  reintentar:boolean=false;
  mensaje:string="";
  errorDniUsuario=0;
  errorPwdUsuario=0;
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
    this.errorDniUsuario=this.verificarDniUsuario(this.user.dni_usuario);
    this.errorPwdUsuario=this.verificarPwdUsuario(this.user.pwd_usuario);
    if((this.errorDniUsuario+this.errorPwdUsuario)>0){
      this.error = true;
      return false;
    }
    return true;
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
    //const patron=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
    if(pwd_usuario.length==0)
      return 1;
    if(pwd_usuario.length>20)
      return 2;
    /*if(!patron.test(pwd_usuario))
      return 3;
      */
    return 0;
  }
  
  onBlurPwdUsuario(passqord: any){    
    this.errorPwdUsuario=this.verificarPwdUsuario(passqord);
  }

  recargarForm(){
    this.reintentar=false;
    this.user.dni_usuario="";   
    this.user.pwd_usuario="";
	  this.mensaje="";
  }

}
