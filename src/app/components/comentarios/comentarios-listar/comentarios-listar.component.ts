import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-comentarios-listar',
  templateUrl: './comentarios-listar.component.html',
  styleUrls: ['./comentarios-listar.component.css']
})
export class ComentariosListarComponent implements OnInit {

  comentarios:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  revelar:boolean=false; // true

  archivoSeleccionado:any;
  file:any;
  admin:Boolean=false;
  usuario:any = [];
  fotos:any = [];

  confirmacion:boolean = false;
  error:boolean = false;
  mensaje = "";

  constructor(private comentariosService:ComentariosService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.comentariosService.listarComentarios().subscribe(
      res => { 
				this.comentarios = res;
			},
      err =>{
        this.error=true;
        this.mensaje = err.error.message;
      }
    )

    //LISTAR FOTOS
    this.comentariosService.listarArchivos().subscribe(
      res => {
        this.fotos = res;
      },        
        err => {
          this.error=true;
          this.mensaje = err.error.message;  
      }
    )
  }

  

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
