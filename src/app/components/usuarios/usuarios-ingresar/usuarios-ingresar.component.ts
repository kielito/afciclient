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
    const patron=/^[a-zA-Z]{2,20}$/;
    if(usuario.length==0)
      return 1;
    if(usuario.length>20)
      return 2;
    if(!patron.test(usuario))
      return 3;
    return 0;
  }

  onBlurUsuario(event: any){    
    this.errorUsuario=this.verificarUsuario(event);  
  }

  verificarEmail(email:string):number {    
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
  
  verificarPassword(password:any): number {    
    //const patron=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    /*if(!patron.test(password))
      return 3;
      */
    return 0;
  }
  
  onBlurPassword(passqord: any){    
    this.errorPassword=this.verificarPassword(passqord);
  }

  recargarForm(){
    this.reintentar=false;
    this.user.Usuario="";
    this.user.Email="";
    this.user.Password="";
	  this.mensaje="";
  }

}
