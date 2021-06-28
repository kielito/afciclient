import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

//Para subir archivos
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.css']
})
export class UsuariosHomeComponent implements OnInit {

  archivoSeleccionado:any;
  file:any;
  admin:Boolean=false;
  usuario:any = [];

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {    
    this.usuariosService.logued$.emit();
    this.usuario = JSON.parse(localStorage.usuario);
    
    if(this.usuario.Perfil==="Admin")							
		  this.admin = true;
    else
		  this.admin = false;      
  }


  SeleccionArchivo(event: any): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.archivoSeleccionado = reader.result;
      reader.readAsDataURL(this.file);   
      
      console.log(this.file);
    }
  }

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
    this.usuariosService.logOut();
  }

}

